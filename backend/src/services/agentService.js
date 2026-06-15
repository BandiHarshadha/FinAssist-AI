import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const askAgent = async (systemPrompt, userMessage) => {
  try {
    const prompt = `
${systemPrompt}

User:
${userMessage}

Assistant:
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error(error);

    return "I'm unable to answer at the moment.";
  }
};