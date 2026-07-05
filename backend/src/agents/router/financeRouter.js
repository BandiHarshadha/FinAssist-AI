import { financeKnowledgeAgent } from "../financeKnowledgeAgent.js";

export async function financeRouter(message) {
  if (!message) return null;

  const knowledgeReply = financeKnowledgeAgent(message);

  if (knowledgeReply) {
    return knowledgeReply;
  }

  return null;
}
