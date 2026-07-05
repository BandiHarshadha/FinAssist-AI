import { financeKnowledgeAgent } from "../financeKnowledgeAgent.js";

/**
 * Finance Router
 * ------------------------
 * Decides which finance agent should answer.
 * This router is intentionally simple for now.
 * Later we'll plug in:
 * - Banking Agents
 * - Loan Agents
 * - Investment Agents
 * - Insurance Agents
 * - Tax Agents
 * - Financial Planning Agents
 * - Gemini Conversational Layer
 */

export async function financeRouter(message) {
  if (!message) return null;

  const text = message.toLowerCase();

  // First use Finance Knowledge Agent
  const knowledgeReply = financeKnowledgeAgent(text);

  if (knowledgeReply) {
    return knowledgeReply;
  }

  // Future routing examples
  /*
  if(text.includes("loan")){
      return personalLoanAgent(message);
  }

  if(text.includes("credit card")){
      return creditCardAgent(message);
  }

  if(text.includes("insurance")){
      return insuranceAgent(message);
  }

  if(text.includes("tax")){
      return taxAgent(message);
  }
  */

  // Nothing matched
  return null;
}