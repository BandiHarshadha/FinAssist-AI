import { saveMemory } from "../memory/userProfileMemory.js";

import User from "../models/User.js";
import { calculateDigitalTwin } from "../tools/digitalTwinCalculator.js";

import { detectAgentIntent } from "./agenticDecisionEngine.js";

import { financialDigitalTwinAgent } from "./financialDigitalTwinAgent.js";
import { creditCardAgent } from "./creditCardAgent.js";
import { savingsAgent } from "./savingsAgent.js";
import { loanAgent } from "./loanAgent.js";
import { investmentAgent } from "./investmentAgent.js";
import { buyingDecisionAgent } from "./buyingDecisionAgent.js";

import { aiCfpAgent } from "./aiCfpAgent.js";
import { financeKnowledgeAgent } from "./financeKnowledgeAgent.js";
import { generalFinancialAgent } from "./generalFinancialAgent.js";

function getTwinFromUser(userId) {
  if (!userId) return null;

  const user = User.findById(userId);
  if (!user) return null;

  const twin = calculateDigitalTwin(user);

  User.update(userId, {
    financialDigitalTwin: twin,
    savings: twin.monthlySavings,
    emi: twin.totalEmi,
  });

  return twin;
}

export async function finAssistBrain(message, userId = null) {
  saveMemory(message);

  const intent = detectAgentIntent(message);
  const twin = getTwinFromUser(userId);

  console.log("AGENTIC AI USER:", userId || "Guest");
  console.log("AGENTIC AI INTENT:", intent);
  console.log("AGENTIC AI DIGITAL TWIN:", twin || "No twin");

  switch (intent) {
    case "DIGITAL_TWIN":
      return financialDigitalTwinAgent(userId);

    case "CREDIT_CARD":
      return creditCardAgent(message, {
        income: twin?.monthlyIncome || 0,
        emi: twin?.totalEmi || 0,
        expenses: twin?.monthlyExpenses || 0,
        emiLoad: twin?.emiRatio || 0,
        creditUtilization: twin?.creditUtilization || 0,
        activeLoans: twin?.activeLoans || 0,
        activeCreditCards: twin?.activeCreditCards || 0,
        financialScore: twin?.financialScore || 0,
        riskLevel: twin?.riskLevel || "Unknown",
      });

    case "LOAN":
      return loanAgent(message, twin);

    case "SAVINGS":
      return savingsAgent(message, twin);

    case "INVESTMENT":
      return investmentAgent(message, twin);

    case "BUYING_DECISION":
      return buyingDecisionAgent(message, twin);

    case "AI_CFP":
      return aiCfpAgent(twin);

    default: {
      const knowledgeReply = financeKnowledgeAgent(message, twin);
      if (knowledgeReply) return knowledgeReply;

      return generalFinancialAgent(message, twin);
    }
  }
}