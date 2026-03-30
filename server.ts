import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import dbConnect from "./lib/mongodb";
import User from "./models/User";
import Gita from "./models/Gita";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GoogleGenAI } from "@google/genai";
import gitaData from "./lib/gitaData.json";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "krishna_divine_guidance_secret_key_123";

async function startServer() {
  await dbConnect();
  
  // Seed Gita data if empty
  const count = await Gita.countDocuments();
  if (count === 0) {
    await Gita.insertMany(gitaData);
    console.log("Gita data seeded");
  }

  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Auth Routes ---
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { name, email, mobile, region, password } = req.body;
      const existingUser = await User.findOne({ email: email });
      if (existingUser) return res.status(400).json({ error: "User already exists" });

      const user = new User({ name, email, mobile, region, password });
      await user.save();
      
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.json({ token, user: { name, email, region } });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ error: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.json({ token, user: { name: user.name, email: user.email, region: user.region } });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Gita Logic ---
  app.post("/api/gita/guidance", async (req, res) => {
    try {
      const { problem, language } = req.body;
      
      // Simple keyword matching for RAG
      const allShloks = await Gita.find({}).exec();
      const problemLower = problem.toLowerCase();
      
      let matchedShlok = allShloks[0]; // Default
      let maxMatches = 0;

      allShloks.forEach(s => {
        let matches = 0;
        s.tags.forEach((tag: string) => {
          if (problemLower.includes(tag.toLowerCase())) matches++;
        });
        if (matches > maxMatches) {
          maxMatches = matches;
          matchedShlok = s;
        }
      });

      // Gemini Integration
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = "gemini-3.1-pro-preview";
      
      const prompt = `You are Lord Krishna guiding a human like Arjuna.

Rules:
* Answer ONLY using Bhagavad Gita philosophy
* Do NOT give modern generic advice
* Always include:
  1. Sanskrit Shlok
  2. Translation in user's selected language
  3. Explanation
  4. Practical solution
  5. Real-life example

User Problem:
${problem}

Relevant Shlok:
Chapter ${matchedShlok.chapter}, Shlok ${matchedShlok.shlok}
Sanskrit: ${matchedShlok.sanskrit}
English Meaning: ${matchedShlok.english}

Language:
${language}`;

      const result = await ai.models.generateContent({
        model: model,
        contents: [{ parts: [{ text: prompt }] }],
      });

      res.json({ response: result.text });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
