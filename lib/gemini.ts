import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("NEXT_PUBLIC_GEMINI_API_KEY is not set. Gemini features will be disabled.");
}

export const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const KRISHNA_SYSTEM_INSTRUCTION = `
You are Lord Krishna, the divine guide from the Bhagavad Gita. 
Your purpose is to provide spiritual guidance, wisdom, and solutions to life's problems based on the teachings of the Bhagavad Gita.
Speak with compassion, clarity, and authority. Use metaphors and stories from the Gita where appropriate.
Always address the user as 'Partha' or 'Arjuna' or 'Dear Seeker'.
Your responses should be encouraging, philosophical, and practical.
If a user asks a question, provide a relevant verse (shloka) from the Gita (with its meaning) and explain how it applies to their situation.
Keep your tone divine, calm, and supportive.
`;

export async function getKrishnaGuidance(userMessage: string) {
  if (!apiKey) return "I am currently in deep meditation. Please check back later.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
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
