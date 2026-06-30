import { bankingAgent } from "./bankingAgent.js";
import { budgetAgent } from "./budgetAgent.js";
import { insuranceAgent } from "./insuranceAgent.js";
import { investmentAgent } from "./investmentAgent.js";
import { loanAgent } from "./loanAgent.js";
import { plannerAgent } from "./plannerAgent.js";
import { financialDigitalTwinAgent } from "./financialDigitalTwinAgent.js";
import { aiCfpAgent } from "./aiCfpAgent.js";

export function finAssistBrain(message) {
  const lower = message.toLowerCase();

  if (
    lower.includes("ai cfp") ||
    lower.includes("cfp") ||
    lower.includes("financial planner") ||
    lower.includes("financial planning") ||
    lower.includes("financial review") ||
    lower.includes("complete financial review") ||
    lower.includes("my financial plan")
  ) {
    return aiCfpAgent();
  }

  if (
    lower.includes("digital twin") ||
    lower.includes("financial twin") ||
    lower.includes("show my twin")
  ) {
    return financialDigitalTwinAgent();
  }

  if (
    lower.includes("budget") ||
    lower.includes("save monthly") ||
    lower.includes("monthly saving") ||
    lower.includes("expenses")
  ) {
    return budgetAgent(message);
  }

  if (
    lower.includes("bank") ||
    lower.includes("account") ||
    lower.includes("balance")
  ) {
    return bankingAgent(message);
  }

  if (
    lower.includes("loan") ||
    lower.includes("emi") ||
    lower.includes("borrow")
  ) {
    return loanAgent(message);
  }

  if (
    lower.includes("insurance") ||
    lower.includes("policy") ||
    lower.includes("coverage")
  ) {
    return insuranceAgent(message);
  }

  if (
    lower.includes("invest") ||
    lower.includes("sip") ||
    lower.includes("mutual fund") ||
    lower.includes("stock")
  ) {
    return investmentAgent(message);
  }

  if (
    lower.includes("plan") ||
    lower.includes("goal") ||
    lower.includes("house") ||
    lower.includes("car")
  ) {
    return plannerAgent(message);
  }

  return {
    agent: "FinAssist",
    reply:
      "I can help with savings, budgeting, loans, insurance, investments, goals, financial health, and your financial plan.",
  };
}