import { getMemory } from "../memory/userProfileMemory.js";
import { goalPlanningAgent } from "./goalPlanningAgent.js";
import { financialHealthAgent } from "./financialHealthAgent.js";

export const orchestratorAgent = () => {
  const memory = getMemory();

  const income = memory.income || 0;
  const expenses = memory.expenses || 0;
  const emi = memory.emi || 0;
  const savings = income - expenses - emi;

  const goalResult = goalPlanningAgent(memory);
  const healthResult = financialHealthAgent(memory);

  return {
    agent: "Multi-Agent Orchestrator",
    reply: `
Agents Executed:
✓ Memory Agent
✓ Budget Agent
✓ Goal Planning Agent
✓ Financial Health Agent

Final Financial Summary:
Monthly Income: ₹${income}
Monthly Expenses: ₹${expenses}
Monthly EMI: ₹${emi}
Monthly Savings: ₹${savings}

Goal Plan:
${goalResult.reply}

Health Score:
${healthResult.reply}

Final Recommendation:
You can save ₹${savings} per month. Use part of this amount for your goal and keep some amount for emergency savings.
`
  };
};