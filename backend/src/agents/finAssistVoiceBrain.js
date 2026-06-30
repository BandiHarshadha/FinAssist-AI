import { geminiFinanceFallback } from "../services/geminiFallbackService.js";
import { getMemory } from "../memory/userProfileMemory.js";
import { rupees, makeVoiceSafe } from "../utils/spokenFormat.js";
import { goalPlanningAgent } from "./goalPlanningAgent.js";
import { financialHealthAgent } from "./financialHealthAgent.js";
import { runLangGraphFinancialWorkflow } from "../workflows/langgraphFinancialWorkflow.js";
import { detectIntent } from "../router/intentRouter.js";
import { financialDigitalTwinAgent } from "./financialDigitalTwinAgent.js";
import { whatIfSimulatorAgent } from "./whatIfSimulatorAgent.js";

function calculateSavings(memory) {
  return (
    Number(memory.income || 0) -
    Number(memory.expenses || 0) -
    Number(memory.emi || 0)
  );
}

function localGeneralReply(transcript, memory) {
  const text = String(transcript || "").toLowerCase();
  const savings = calculateSavings(memory);

  if (
    text.includes("spending") ||
    text.includes("expenses") ||
    text.includes("reduce")
  ) {
    return `Spending Agent is checking. Your monthly saving is ${rupees(
      savings
    )}. Cut food orders, subscriptions, shopping, and impulse spending first.`;
  }

  if (
    text.includes("laptop") ||
    text.includes("buy") ||
    text.includes("purchase") ||
    text.includes("afford")
  ) {
    return `Buying Decision Agent is checking. Your monthly saving is ${rupees(
      savings
    )}. Buy only if the cost is below half your monthly savings.`;
  }

  if (
    text.includes("invest") ||
    text.includes("sip") ||
    text.includes("mutual fund")
  ) {
    return "Investment Agent is checking. First keep emergency savings. Then start a small SIP gradually.";
  }

  if (text.includes("loan") || text.includes("emi")) {
    return "Loan Agent is checking. Avoid new loans if EMI is already high.";
  }

  if (text.includes("insurance")) {
    return "Insurance Agent is checking. First take health insurance. Take term insurance only if someone depends on your income.";
  }

  if (text.includes("tax") || text.includes("itr")) {
    return "Tax Agent is checking. I can explain basics. For filing, ask a tax professional.";
  }

  return "FinAssist can help. Ask about savings, expenses, loans, goals, buying decisions, investment, insurance, tax, what-if simulation, or your financial digital twin.";
}

function buyingDecision(memory) {
  const savings = calculateSavings(memory);

  return `Buying Decision Agent is checking. Your monthly saving is ${rupees(
    savings
  )}. Buy only if the cost is below half your monthly savings.`;
}

function loanAdvice(memory) {
  const income = Number(memory.income || 0);
  const emi = Number(memory.emi || 0);
  const savings = calculateSavings(memory);

  if (!income) {
    return "Loan Agent is checking. Please share your income first.";
  }

  if (emi > income * 0.4) {
    return "Loan Agent is checking. Your EMI is high. Avoid another loan now.";
  }

  if (savings > income * 0.3) {
    return "Loan Agent is checking. Your loan capacity looks decent. Keep EMI below forty percent of income.";
  }

  return "Loan Agent is checking. Your savings are limited. Avoid new loans now.";
}

function investmentAdvice(memory) {
  const savings = calculateSavings(memory);

  if (savings <= 0) {
    return "Investment Agent is checking. First build monthly savings before investing.";
  }

  return "Investment Agent is checking. First build emergency savings. Then start a small SIP gradually.";
}

function insuranceAdvice(memory) {
  if (!memory.income) {
    return "Insurance Agent is checking. Please share your income first.";
  }

  return "Insurance Agent is checking. First take health insurance. Take term insurance if family depends on your income.";
}

function taxAdvice() {
  return "Tax Agent is checking. I can explain basic tax planning. For exact filing, ask a tax professional.";
}

export async function finAssistVoiceBrain(transcript) {
  const memory = getMemory();
  const intent = detectIntent(transcript);

  if (intent === "digital_twin") {
    return financialDigitalTwinAgent();
  }

  if (intent === "what_if") {
    return whatIfSimulatorAgent(transcript);
  }

  if (intent === "budget") {
    const savings = calculateSavings(memory);

    return {
      agent: "Budget Agent",
      reply: makeVoiceSafe(
        `Budget Agent is calculating. You can save ${rupees(
          savings
        )} every month.`
      ),
    };
  }

  if (intent === "buying") {
    return {
      agent: "Buying Decision Agent",
      reply: makeVoiceSafe(buyingDecision(memory)),
    };
  }

  if (intent === "loan") {
    return {
      agent: "Loan Agent",
      reply: makeVoiceSafe(loanAdvice(memory)),
    };
  }

  if (intent === "investment") {
    return {
      agent: "Investment Agent",
      reply: makeVoiceSafe(investmentAdvice(memory)),
    };
  }

  if (intent === "insurance") {
    return {
      agent: "Insurance Agent",
      reply: makeVoiceSafe(insuranceAdvice(memory)),
    };
  }

  if (intent === "tax") {
    return {
      agent: "Tax Agent",
      reply: makeVoiceSafe(taxAdvice()),
    };
  }

  if (intent === "goal") {
    const result = goalPlanningAgent(memory);

    return {
      agent: "Goal Planning Agent",
      reply: makeVoiceSafe(`Goal Planning Agent is working. ${result.reply}`),
    };
  }

  if (intent === "health") {
    const result = financialHealthAgent(memory);

    return {
      agent: "Financial Health Agent",
      reply: makeVoiceSafe(
        `Financial Health Agent is reviewing. ${result.reply}`
      ),
    };
  }

  if (intent === "full_review") {
    const result = await runLangGraphFinancialWorkflow(transcript);

    return {
      agent: "LangGraph Workflow",
      reply: makeVoiceSafe(result.reply),
    };
  }

  try {
    const fallbackReply = await geminiFinanceFallback(transcript);

    return {
      agent: "Gemini Finance Agent",
      reply: fallbackReply,
    };
  } catch (error) {
    return {
      agent: "FinAssist Local Agent",
      reply: makeVoiceSafe(localGeneralReply(transcript, memory)),
    };
  }
}