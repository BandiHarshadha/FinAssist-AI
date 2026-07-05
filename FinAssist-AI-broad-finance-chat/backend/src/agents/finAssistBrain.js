import { saveMemory, getProfileMemory } from "../memory/userProfileMemory.js";
import { financialDigitalTwinAgent } from "./financialDigitalTwinAgent.js";
import { aiCfpAgent } from "./aiCfpAgent.js";
import { financeKnowledgeAgent } from "./financeKnowledgeAgent.js";

function detectIntent(message) {
  const text = message.toLowerCase();

  if (text.includes("digital twin") || text.includes("financial twin")) {
    return "DIGITAL_TWIN";
  }

  if (text.includes("cfp") || text.includes("financial plan")) {
    return "AI_CFP";
  }

  if (
    text.includes("buy") ||
    text.includes("bike") ||
    text.includes("car") ||
    text.includes("laptop") ||
    text.includes("price") ||
    text.includes("afford")
  ) {
    return "BUYING_DECISION";
  }

  if (text.includes("loan") || text.includes("emi")) {
    return "LOAN";
  }

  if (text.includes("save") || text.includes("savings")) {
    return "SAVINGS";
  }

  return "GENERAL";
}

function extractAmount(text) {
  const lower = text.toLowerCase();

  const lakhMatch = lower.match(/(\d+(\.\d+)?)\s*(lakh|lakhs|lac|lacs)/);
  if (lakhMatch) return Math.round(Number(lakhMatch[1]) * 100000);

  const croreMatch = lower.match(/(\d+(\.\d+)?)\s*(crore|crores)/);
  if (croreMatch) return Math.round(Number(croreMatch[1]) * 10000000);

  const numberMatch = lower.match(/(\d+(\.\d+)?)/);
  if (numberMatch) return Number(numberMatch[1]);

  return 0;
}

function formatINR(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

function buyingDecisionAgent(message) {
  const profile = getProfileMemory();
  const text = message.toLowerCase();

  const income = profile.income || profile.monthlyIncome || 0;
  const expenses = profile.expenses || profile.monthlyExpenses || 0;
  const emi = profile.emi || 0;
  const monthlySavings = income - expenses - emi;

  const price = extractAmount(message);

  let item = "this purchase";
  if (text.includes("bike")) item = "bike";
  if (text.includes("car")) item = "car";
  if (text.includes("laptop")) item = "laptop";

  if (!income) {
    return {
      agent: "Buying Decision Agent",
      reply: `I can help you decide about the ${item}, but I need your monthly income, expenses, EMI and the ${item} price first.`,
      data: null,
    };
  }

  if (!price) {
    return {
      agent: "Buying Decision Agent",
      reply: `Yes, I can check whether you can buy the ${item}. Your current monthly savings are ${formatINR(
        monthlySavings
      )}. Tell me the exact ${item} price or expected EMI, and I’ll give a safe buy/wait plan.`,
      data: null,
    };
  }

  const safeDownPayment = Math.round(price * 0.25);
  const remainingLoan = price - safeDownPayment;
  const safeEmiLimit = Math.round(income * 0.15);
  const existingEmiLoad = Math.round((emi / income) * 100);
  const totalEmiAfterSafe = emi + safeEmiLimit;
  const totalEmiLoadAfter = Math.round((totalEmiAfterSafe / income) * 100);

  let verdict = "possible";
  let decision = "";

  if (price > income * 6) {
    verdict = "risky";
    decision = `A ${formatINR(price)} ${item} is quite expensive compared to your monthly income of ${formatINR(
      income
    )}. It is possible only if this is essential and you take a controlled loan.`;
  } else if (monthlySavings > price * 0.25) {
    verdict = "safe";
    decision = `Yes, you can plan this ${item} purchase, but do it carefully instead of paying everything at once.`;
  } else {
    verdict = "wait";
    decision = `You should wait and build more savings before buying this ${item}.`;
  }

  return {
    agent: "Buying Decision Agent",
    reply: `${decision}

Here is a safe plan:
1. Bike price: ${formatINR(price)}
2. Monthly income: ${formatINR(income)}
3. Expenses: ${formatINR(expenses)}
4. Existing EMI: ${formatINR(emi)}
5. Current monthly savings: ${formatINR(monthlySavings)}

Recommended approach:
- Pay around ${formatINR(safeDownPayment)} as down payment.
- Keep new EMI below ${formatINR(safeEmiLimit)} per month.
- After buying, total EMI load should stay near ${totalEmiLoadAfter}% or lower.
- Avoid using your full savings; keep emergency fund untouched.

Final suggestion: ${
      verdict === "safe"
        ? "You can buy, but choose a loan/EMI that does not disturb your emergency fund."
        : verdict === "risky"
        ? "This is risky. Buy only if it is very important, otherwise choose a lower-budget bike."
        : "Wait for a few months and increase down payment first."
    }`,
    data: {
      type: "buying_decision",
      item,
      price,
      income,
      expenses,
      emi,
      monthlySavings,
      safeDownPayment,
      safeEmiLimit,
      verdict,
    },
  };
}

function savingsAgent() {
  const profile = getProfileMemory();

  const income = profile.income || profile.monthlyIncome || 0;
  const expenses = profile.expenses || profile.monthlyExpenses || 0;
  const emi = profile.emi || 0;
  const savings = income - expenses - emi;
  const savingsRate = income ? Math.round((savings / income) * 100) : 0;

  return {
    agent: "Savings Agent",
    reply: `Based on your current profile, your estimated monthly savings are ${formatINR(
      savings
    )}. Your savings rate is ${savingsRate}%.

A good savings plan:
1. Keep 6 months expenses as emergency fund.
2. Split savings into short-term goals and investments.
3. Avoid increasing EMI too much.
4. For major goals like bike/car/house, use a down payment plan instead of draining savings.`,
    data: null,
  };
}

function loanAgent(message) {
  return {
    agent: "Loan Agent",
    reply:
      "I can calculate loan safety for you. Share loan amount, interest rate, and tenure. As a rule, total EMI should stay below 35–40% of monthly income.",
    data: null,
  };
}

function generalAgent(message) {
  return {
    agent: "FinAssist AI",
    reply:
      "I’m here with you. Ask me about buying decisions, savings, loans, credit cards, investments, insurance, digital twin, or AI CFP planning. I’ll use your saved financial profile to give a practical answer.",
    data: null,
  };
}

export async function finAssistBrain(message) {
  saveMemory(message);

  const intent = detectIntent(message);

  if (intent === "DIGITAL_TWIN") {
    return financialDigitalTwinAgent();
  }

  if (intent === "AI_CFP") {
    return aiCfpAgent();
  }

  const broadFinanceReply = financeKnowledgeAgent(message);
  if (broadFinanceReply) {
    return broadFinanceReply;
  }

  if (intent === "BUYING_DECISION") {
    return buyingDecisionAgent(message);
  }

  if (intent === "SAVINGS") {
    return savingsAgent(message);
  }

  if (intent === "LOAN") {
    return loanAgent(message);
  }

  return generalAgent(message);
}