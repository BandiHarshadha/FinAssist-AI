import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function extractNumber(prompt, keys) {
  const lower = prompt.toLowerCase();

  for (const key of keys) {
    const regex = new RegExp(`${key}\\s*[:=]?\\s*(₹|rs)?\\s*(\\d+)`, "i");
    const match = lower.match(regex);
    if (match) return Number(match[2]);
  }

  return null;
}

function localFinancialFallback(prompt) {
  const income = extractNumber(prompt, ["income", "salary"]);
  const expenses = extractNumber(prompt, ["expenses", "expense", "spending"]);
  const emi = extractNumber(prompt, ["emi", "loan"]);

  if (income && expenses !== null && emi !== null) {
    const left = income - expenses - emi;
    const emiRatio = Math.round((emi / income) * 100);

    if (left <= 0) {
      return `No, not safe now. Your income is ₹${income}, expenses ₹${expenses}, and EMI ₹${emi}, so nothing is left monthly.`;
    }

    if (emiRatio > 35) {
      return `Not recommended now. Your EMI is ${emiRatio}% of income, which is high. You have ₹${left} left monthly, so reduce EMI first.`;
    }

    return `Yes, possible if the bike EMI fits within your remaining ₹${left} monthly. Keep total EMI below 35% of income.`;
  }

  return "I understood. Please share income, expenses, EMI, and item cost so I can answer clearly.";
}

export async function askAgent(prompt) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return localFinancialFallback(prompt);
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `
You are FinAssist AI.

Rules:
- Give only short and clear financial replies.
- Maximum 2 to 4 short sentences.
- Maximum 60 words.
- No long explanations.
- No markdown headings.
- No unnecessary examples.
- Answer exactly what user needs.
- If calculation is needed, give only final result and one reason.

User/Agent Prompt:
${prompt}
`,
    });

    return response.text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/\n{3,}/g, "\n")
      .trim();
  } catch (error) {
    console.error("Agent Service Error:", error.message);
    return localFinancialFallback(prompt);
  }
}