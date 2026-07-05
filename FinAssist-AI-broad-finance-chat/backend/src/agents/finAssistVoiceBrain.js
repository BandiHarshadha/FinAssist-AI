import { detectIntent } from "../router/intentRouter.js";

import { aiCfpAgent } from "../agents/aiCfpAgent.js";
import { financialDigitalTwinAgent } from "../agents/financialDigitalTwinAgent.js";
import { buyingDecisionAgent } from "../agents/buyingDecisionAgent.js";

import { budgetAgent } from "../agents/budgetAgent.js";
import { loanAgent } from "../agents/loanAgent.js";
import { investmentAgent } from "../agents/investmentAgent.js";
import { insuranceAgent } from "../agents/insuranceAgent.js";
import { plannerAgent } from "../agents/plannerAgent.js";
import { bankingAgent } from "../agents/bankingAgent.js";

export function finAssistVoiceBrain(transcript) {
  const intent = detectIntent(transcript);

  console.log("Voice Intent:", intent);

  if (intent === "ai_cfp") {
    return aiCfpAgent();
  }

  if (intent === "digital_twin") {
    return financialDigitalTwinAgent();
  }

  if (intent === "budget") {
    return budgetAgent(transcript);
  }

  if (intent === "buying") {
    return buyingDecisionAgent(transcript);
  }

  if (intent === "loan") {
    return loanAgent(transcript);
  }

  if (intent === "investment") {
    return investmentAgent(transcript);
  }

  if (intent === "insurance") {
    return insuranceAgent(transcript);
  }

  if (intent === "goal") {
    return plannerAgent(transcript);
  }

  if (intent === "banking") {
    return bankingAgent(transcript);
  }

  if (intent === "full_review") {
    return {
      agent: "Financial Profile Review",
      reply:
        "Here is your complete financial profile review. For a clean financial planning report, say: Run financial review.",
    };
  }

  if (intent === "what_if") {
    return {
      agent: "What-if Simulation",
      reply:
        "What-if simulation is ready. Try asking: What if I reduce my expenses by ₹5000?",
    };
  }

  if (intent === "health") {
    return {
      agent: "Financial Health",
      reply:
        "I can calculate your financial health score. Try saying: Run financial review.",
    };
  }

  if (intent === "tax") {
    return {
      agent: "Tax Helper",
      reply:
        "I can help with basic tax planning. Tell me your income and deductions.",
    };
  }

  return {
    agent: "FinAssist",
    reply:
      "I can help with savings, budgeting, buying decisions, loans, investments, insurance, goals, digital twin, and financial planning.",
  };
}