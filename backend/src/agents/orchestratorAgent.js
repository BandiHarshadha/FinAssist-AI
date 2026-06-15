import { getIntentFromGemini } from "../services/geminiService.js";

import { bankingAgent } from "./bankingAgent.js";
import { loanAgent } from "./loanAgent.js";
import { investmentAgent } from "./investmentAgent.js";
import { insuranceAgent } from "./insuranceAgent.js";
import { budgetAgent } from "./budgetAgent.js";
import { plannerAgent } from "./plannerAgent.js";

const fallbackIntent = (message) => {
  const text = message.toLowerCase();

  const hasLoan =
    text.includes("emi") ||
    text.includes("loan") ||
    text.includes("house") ||
    text.includes("home") ||
    text.includes("property") ||
    text.includes("mortgage");

  const hasInvestment =
    text.includes("invest") ||
    text.includes("investment") ||
    text.includes("sip") ||
    text.includes("mutual") ||
    text.includes("stock") ||
    text.includes("fd") ||
    text.includes("fixed deposit");

  const hasInsurance =
    text.includes("insurance") ||
    text.includes("policy") ||
    text.includes("premium") ||
    text.includes("claim");

  const hasBanking =
    text.includes("bank") ||
    text.includes("account") ||
    text.includes("upi") ||
    text.includes("card") ||
    text.includes("balance") ||
    text.includes("transaction") ||
    text.includes("kyc");

  const hasBudget =
    text.includes("salary") ||
    text.includes("income") ||
    text.includes("expense") ||
    text.includes("expenses") ||
    text.includes("budget") ||
    text.includes("afford") ||
    text.includes("spend") ||
    text.includes("savings");

  const intents = [];

  if (hasLoan) intents.push("LOAN");
  if (hasInvestment) intents.push("INVESTMENT");
  if (hasInsurance) intents.push("INSURANCE");
  if (hasBanking) intents.push("BANKING");
  if (hasBudget) intents.push("BUDGET");

  if (intents.length > 1) return "MULTI_AGENT";
  if (intents.length === 1) return intents[0];

  return "GENERAL";
};

const runAgentsForMultiAgent = async (message) => {
  const text = message.toLowerCase();
  const results = [];

  if (
    text.includes("emi") ||
    text.includes("loan") ||
    text.includes("house") ||
    text.includes("home") ||
    text.includes("property") ||
    text.includes("mortgage")
  ) {
    results.push(await loanAgent(message));
  }

  if (
    text.includes("invest") ||
    text.includes("investment") ||
    text.includes("sip") ||
    text.includes("mutual") ||
    text.includes("stock") ||
    text.includes("fd") ||
    text.includes("fixed deposit")
  ) {
    results.push(await investmentAgent(message));
  }

  if (
    text.includes("insurance") ||
    text.includes("policy") ||
    text.includes("premium") ||
    text.includes("claim")
  ) {
    results.push(await insuranceAgent(message));
  }

  if (
    text.includes("bank") ||
    text.includes("account") ||
    text.includes("upi") ||
    text.includes("card") ||
    text.includes("balance") ||
    text.includes("transaction") ||
    text.includes("kyc")
  ) {
    results.push(await bankingAgent(message));
  }

  if (
    text.includes("salary") ||
    text.includes("income") ||
    text.includes("expense") ||
    text.includes("expenses") ||
    text.includes("budget") ||
    text.includes("afford") ||
    text.includes("spend") ||
    text.includes("savings")
  ) {
    results.push(await budgetAgent(message));
  }

  return results;
};

export const orchestratorAgent = async (message) => {
  let intent = fallbackIntent(message);

  // Use Gemini only when fallback cannot classify.
  // This prevents quota errors from breaking demo flow.
  if (intent === "GENERAL") {
    intent = await getIntentFromGemini(message);
  }

  console.log("Detected Intent:", intent);

  let result;

  if (intent === "MULTI_AGENT") {
    const results = await runAgentsForMultiAgent(message);

    const combinedReply = results
      .map((item) => {
        return `### ${item.agent}\nTool Used: ${item.tool || "None"}\n\n${item.reply}`;
      })
      .join("\n\n--------------------------------\n\n");

    const toolsUsed = results
      .map((item) => item.tool)
      .filter((tool) => tool && tool !== "None");

    const finalResponse = await plannerAgent(message, {
      agent: "Multi-Agent Collaboration",
      tool: toolsUsed.length > 0 ? toolsUsed.join(", ") : "None",
      reply: combinedReply,
    });

    return {
      intent: "MULTI_AGENT",
      selectedAgent: "Multi-Agent Collaboration",
      tool: toolsUsed.length > 0 ? toolsUsed.join(", ") : "None",
      reply: finalResponse.reply,
    };
  }

  switch (intent) {
    case "BANKING":
      result = await bankingAgent(message);
      break;

    case "LOAN":
      result = await loanAgent(message);
      break;

    case "INVESTMENT":
      result = await investmentAgent(message);
      break;

    case "INSURANCE":
      result = await insuranceAgent(message);
      break;

    case "BUDGET":
      result = await budgetAgent(message);
      break;

    default:
      result = {
        agent: "General Agent",
        tool: "None",
        reply:
          "Please ask about banking, loans, investments, insurance, or budgeting.",
      };
  }

  const finalResponse = await plannerAgent(message, result);

  return {
    intent,
    selectedAgent: result.agent,
    tool: result.tool || "None",
    reply: finalResponse.reply,
  };
};