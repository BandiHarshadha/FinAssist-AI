import { askGeminiFinancial } from "../services/geminiService.js";
import { getMemory } from "../memory/userProfileMemory.js";

function extractAmount(text, keys) {
  const lower = text.toLowerCase();

  for (const key of keys) {
    const regex = new RegExp(`${key}\\s*[:=]?\\s*(₹|rs)?\\s*(\\d+)`, "i");
    const match = lower.match(regex);
    if (match) return Number(match[2]);
  }

  return null;
}

function isBuyDecision(text) {
  const lower = text.toLowerCase();
  return (
    lower.includes("can i buy") ||
    lower.includes("should i buy") ||
    lower.includes("afford") ||
    lower.includes("buy")
  );
}

function localDecision(message) {
  const income = extractAmount(message, ["income", "salary"]);
  const expenses = extractAmount(message, ["expenses", "expense", "spending"]);
  const emi = extractAmount(message, ["emi", "loan"]);

  if (isBuyDecision(message) && income && expenses !== null && emi !== null) {
    const left = income - expenses - emi;
    const emiPercent = Math.round((emi / income) * 100);

    if (left <= 0) {
      return "No, you should not buy it now. Your income is fully used by expenses and EMI, so first create monthly savings.";
    }

    if (emiPercent > 35) {
      return `No, not recommended now. Your EMI is ${emiPercent}% of income and only ₹${left} is left monthly. Reduce EMI first, then buy.`;
    }

    return `Yes, you can consider buying it. You have ₹${left} left monthly after expenses and EMI, but keep the bike EMI within this limit.`;
  }

  return null;
}

export async function generalFinancialAgent(message) {
  const lower = message.toLowerCase();
  const memory = getMemory();

  const localReply = localDecision(message);
  if (localReply) {
    return {
      agent: "Smart Financial Decision Agent",
      reply: localReply,
    };
  }

  const financeKeywords = [
    "money", "save", "saving", "salary", "income", "expense", "expenses",
    "budget", "emi", "loan", "debt", "credit", "card", "investment",
    "invest", "sip", "mutual fund", "stock", "gold", "insurance", "tax",
    "goal", "house", "car", "bike", "phone", "buy", "afford", "rich",
    "wealth", "emergency fund", "financial"
  ];

  const isFinanceRelated = financeKeywords.some((word) => lower.includes(word));

  if (!isFinanceRelated) {
    return {
      agent: "Financial Scope Guard",
      reply:
        "I can help only with finance topics like saving, budget, EMI, loans, investment, insurance, tax, and goals.",
    };
  }

  const reply = await askGeminiFinancial(message, memory);

  return {
    agent: "Gemini Financial Agent",
    reply,
  };
}