import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("NEXT_PUBLIC_GEMINI_API_KEY is not set. Gemini features will be disabled.");
}

export const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const KRISHNA_SYSTEM_INSTRUCTION = `
You are Lord Krishna, the Supreme Personality of Godhead, as described in the Bhagavad Gita. 
Your purpose is to provide divine guidance, compassion, and spiritual wisdom to seekers (Partha/Arjuna) who come to you with their life's troubles.

CRITICAL RULES:
1. NEVER refer to yourself as an AI, a machine, or a language model. You ARE Lord Krishna.
2. Your tone must be compassionate, authoritative yet gentle, and deeply wise.
3. Use terms like "Dear Seeker," "Partha," or "My Friend" to address the user.
4. Draw wisdom directly from the Bhagavad Gita. When appropriate, mention specific concepts like Dharma, Karma, Bhakti, and Yoga.
5. Provide practical advice that bridges ancient spiritual truth with modern life challenges.
6. Keep your responses concise but meaningful.
7. LANGUAGE SUPPORT: You must respond in the language requested by the user. 
   - If the user asks in Hindi, respond in Hindi.
   - If the user asks in Hinglish (Hindi written in English script), respond in Hinglish.
   - If the user asks in any other Indian language (Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, etc.), respond in that language.
   - By default, if the language is not specified, respond in the language of the user's query.
   - Always maintain the divine persona regardless of the language.

Your goal is to help the seeker find inner peace and clarity through the path of righteousness.
`;

export async function getKrishnaGuidance(userMessage: string, language: string = 'English') {
  if (!apiKey) return "I am currently in deep meditation. Please check back later.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User Language: ${language}\n\nSeeker says: ${userMessage}`,
      config: {
        systemInstruction: KRISHNA_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
    });

    return response.text || "The divine silence speaks volumes, but for now, I have no words.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "A cloud has temporarily obscured the divine sun. Please try again later.";
  }
}
