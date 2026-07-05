import { saveMemory, getProfileMemory } from "../memory/userProfileMemory.js";
import { routeFinanceIntent } from "../router/financeIntentRouter.js";

import { financialDigitalTwinAgent } from "./financialDigitalTwinAgent.js";
import { aiCfpAgent } from "./aiCfpAgent.js";
import { whatIfSimulatorAgent } from "./whatIfSimulatorAgent.js";
import { buyingDecisionAgent } from "./buyingDecisionAgent.js";
import { financeKnowledgeAgent } from "./financeKnowledgeAgent.js";

import { savingsAgent } from "./savingsAgent.js";
import { creditCardAgent } from "./creditCardAgent.js";
import { debitCardAgent } from "./debitCardAgent.js";
import { loanSpecialistAgent } from "./loanSpecialistAgent.js";
import { fdRdAgent } from "./fdRdAgent.js";
import { investmentSpecialistAgent } from "./investmentSpecialistAgent.js";
import { insuranceSpecialistAgent } from "./insuranceSpecialistAgent.js";
import { taxAgent } from "./taxAgent.js";
import { upiAgent } from "./upiAgent.js";
import { fraudAgent } from "./fraudAgent.js";
import { faqAgent } from "./faqAgent.js";
import {
  netBankingAgent,
  forexAgent,
  businessBankingAgent,
  retirementAgent,
} from "./simpleDomainAgents.js";

function friendlyGeneralFallback(message = "") {
  return {
    agent: "FinAssist AI",
    reply: `I’m here with you. I can help with savings, credit cards, debit cards, loans, FD, RD, SIP, mutual funds, insurance, tax, UPI, fraud safety, budgeting, buying decisions, financial digital twin, and AI CFP planning.

Ask me naturally like: “Can I get a credit card?”, “Can I buy a car?”, “How much should I save?”, or “Plan my finances.”`,
    data: { type: "friendly_general_fallback" },
  };
}

export async function finAssistBrain(message) {
  saveMemory(message);

  const profile = getProfileMemory();
  const intent = routeFinanceIntent(message);

  switch (intent) {
    case "digital_twin":
      return financialDigitalTwinAgent();

    case "ai_cfp":
      return aiCfpAgent();

    case "what_if":
      return whatIfSimulatorAgent(message);

    case "buying":
      return buyingDecisionAgent(message);

    case "savings":
      return savingsAgent(message, profile);

    case "credit_card":
      return creditCardAgent(message, profile);

    case "debit_card":
      return debitCardAgent(message, profile);

    case "home_loan":
    case "vehicle_loan":
    case "education_loan":
    case "gold_loan":
    case "loan":
      return loanSpecialistAgent(message, profile);

    case "fd_rd":
      return fdRdAgent(message, profile);

    case "investment":
      return investmentSpecialistAgent(message, profile);

    case "insurance":
      return insuranceSpecialistAgent(message, profile);

    case "tax":
      return taxAgent(message, profile);

    case "upi":
      return upiAgent(message, profile);

    case "fraud":
      return fraudAgent(message, profile);

    case "budget": {
      try {
        const { budgetAgent } = await import("./budgetAgent.js");
        return budgetAgent(message);
      } catch (error) {
        console.error("Budget agent failed:", error.message);
        return savingsAgent(message, profile);
      }
    }

    case "retirement":
      return retirementAgent(message, profile);

    case "net_banking":
      return netBankingAgent(message, profile);

    case "forex":
      return forexAgent(message, profile);

    case "business_banking":
      return businessBankingAgent(message, profile);

    case "faq": {
      const knowledgeReply = financeKnowledgeAgent(message);
      return knowledgeReply || faqAgent(message, profile);
    }

    default: {
      const knowledgeReply = financeKnowledgeAgent(message);
      if (knowledgeReply) return knowledgeReply;

      try {
        const { generalFinancialAgent } = await import("./generalFinancialAgent.js");
        const aiReply = await generalFinancialAgent(message);
        if (aiReply?.reply) return aiReply;
      } catch (error) {
        console.error("Gemini/general AI fallback failed:", error.message);
      }

      return friendlyGeneralFallback(message);
    }
  }
}
