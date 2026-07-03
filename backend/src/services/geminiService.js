import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

let model = null;

if (apiKey) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
  } catch (err) {
    console.log("Gemini initialization failed:", err.message);
  }
}

export async function askGeminiFinancial(message, memory = {}) {
  if (!model) {
    return null;
  }

  try {
    const prompt = `
You are FinAssist AI.

You are NOT a general chatbot.

Rules:
- Reply only for finance.
- Keep replies under 70 words.
- Never ask again for information already present.
- Use the user's financial memory.
- Give practical recommendations.
- No markdown.
- No bullet lists unless absolutely needed.
- Sound like a premium financial advisor.

User Financial Profile

Monthly Income: ₹${memory.income || 0}

Monthly Expenses: ₹${memory.expenses || 0}

Current EMI: ₹${memory.emi || 0}

Goal Amount: ₹${memory.goal || 0}

Goal Purpose: ${memory.goalPurpose || "Not specified"}

Loan Amount: ₹${memory.loanAmount || 0}

Property Value: ₹${memory.propertyValue || 0}

Down Payment: ₹${memory.downPayment || 0}

Loan Tenure: ${memory.tenureYears || 0} years

User Message:
${message}
`;

    const result = await model.generateContent(prompt);

    return result.response.text().trim();
  } catch (err) {
    console.log("Gemini Error:", err.message);

    return null;
  }
}