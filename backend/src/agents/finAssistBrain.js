import { saveMemory } from "../memory/userProfileMemory.js";
import { financialOrchestrator } from "./financialOrchestrator.js";
import { financialDigitalTwinAgent } from "./financialDigitalTwinAgent.js";
import { aiCfpAgent } from "./aiCfpAgent.js";

export async function finAssistBrain(message) {
  saveMemory(message);

  const lower = message.toLowerCase();

  if (
    lower.includes("digital twin") ||
    lower.includes("financial twin") ||
    lower.includes("virtual twin")
  ) {
    return financialDigitalTwinAgent();
  }

  if (
    lower.includes("ai cfp") ||
    lower.includes("cfp") ||
    lower.includes("financial plan") ||
    lower.includes("financial planning")
  ) {
    return aiCfpAgent();
  }

  return financialOrchestrator(message);
}