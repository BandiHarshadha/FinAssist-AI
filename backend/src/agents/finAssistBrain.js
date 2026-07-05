import { saveMemory } from "../memory/userProfileMemory.js";
import { financialDigitalTwinAgent } from "./financialDigitalTwinAgent.js";
import { aiCfpAgent } from "./aiCfpAgent.js";
import { generalFinancialAgent } from "./generalFinancialAgent.js";
import { financeKnowledgeAgent } from "./financeKnowledgeAgent.js";

function detectIntent(message) {
  const text = message.toLowerCase();

  if (text.includes("digital twin") || text.includes("financial twin")) {
    return "DIGITAL_TWIN";
  }

  if (text.includes("cfp") || text.includes("financial plan")) {
    return "AI_CFP";
  }

  return "GENERAL_FINANCE";
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

  const knowledgeReply = financeKnowledgeAgent(message);
  if (knowledgeReply) {
    return knowledgeReply;
  }

  return await generalFinancialAgent(message);
}