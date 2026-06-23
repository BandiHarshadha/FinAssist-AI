import { saveMemory, getMemory } from "../memory/userProfileMemory.js";
import { goalPlanningAgent } from "./goalPlanningAgent.js";
import { financialHealthAgent } from "./financialHealthAgent.js";
import { orchestratorAgent } from "./orchestratorAgent.js";
import { runLangGraphFinancialWorkflow } from "../workflows/langgraphFinancialWorkflow.js";

export const finAssistBrain = async (message) => {
  const lower = message.toLowerCase();
  const memory = getMemory();

  // 1. LangGraph advanced workflow
  if (
    lower.includes("langgraph") ||
    lower.includes("advanced plan") ||
    lower.includes("agent workflow")
  ) {
    return await runLangGraphFinancialWorkflow(message);
  }

  // 2. Multi-agent full plan
  if (
    lower.includes("full plan") ||
    lower.includes("complete plan") ||
    lower.includes("financial plan") ||
    lower.includes("summary")
  ) {
    const result = orchestratorAgent();

    return {
      agent: result.agent,
      reply: result.reply,
    };
  }

  // 3. Savings question
  if (
    lower.includes("how much can i save") ||
    lower.includes("monthly saving") ||
    lower.includes("monthly savings") ||
    lower.includes("savings")
  ) {
    const income = memory.income || 0;
    const expenses = memory.expenses || 0;
    const emi = memory.emi || 0;

    const savings = income - expenses - emi;

    return {
      agent: "Budget Agent + Memory Agent",
      reply: `Based on your remembered profile, you can save ₹${savings} per month.`,
    };
  }

  // 4. Goal planning question
  if (
    lower.includes("goal plan") ||
    lower.includes("reach my goal") ||
    lower.includes("how long") ||
    lower.includes("target")
  ) {
    const goalResult = goalPlanningAgent(memory);

    return {
      agent: "Goal Planning Agent + Memory Agent",
      reply: goalResult.reply,
    };
  }

  // 5. Financial health score
  if (
    lower.includes("health score") ||
    lower.includes("financial health") ||
    lower.includes("score")
  ) {
    const healthResult = financialHealthAgent(memory);

    return {
      agent: "Financial Health Agent + Memory Agent",
      reply: healthResult.reply,
    };
  }

  // 6. Save personal financial info
  const hasPersonalInfo =
    lower.includes("income") ||
    lower.includes("salary") ||
    lower.includes("earn") ||
    lower.includes("expenses") ||
    lower.includes("emi") ||
    lower.includes("goal");

  if (hasPersonalInfo) {
    saveMemory(message);

    return {
      agent: "Memory Agent",
      reply:
        "I have saved your financial details. I will use this memory to give personalized financial advice.",
    };
  }

  // 7. Loan routing
  if (lower.includes("loan")) {
    return {
      agent: "Loan Agent",
      reply:
        "I can help you check loan eligibility, EMI burden, and repayment planning.",
    };
  }

  // 8. Investment routing
  if (
    lower.includes("investment") ||
    lower.includes("sip") ||
    lower.includes("mutual fund")
  ) {
    return {
      agent: "Investment Agent",
      reply:
        "I can help you plan SIPs, emergency fund, and long-term investment goals.",
    };
  }

  // 9. Budget routing
  if (lower.includes("budget")) {
    return {
      agent: "Budget Agent",
      reply:
        "I can analyze your monthly income, expenses, EMI, and savings capacity.",
    };
  }

  // 10. Default brain response
  return {
    agent: "FinAssist Brain",
    reply:
      "I am FinAssist Brain. I can help with budgeting, savings, loans, SIP planning, insurance, emergency fund, financial health score, LangGraph agent workflow, complete financial plan, and financial goals. Tell me your income, expenses, EMI, or goal to start.",
  };
};