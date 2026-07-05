import { getMemory } from "../memory/userProfileMemory.js";

export function aiCfpAgent() {
  const memory = getMemory();

  const income = Number(memory.income || 0);
  const expenses = Number(memory.expenses || 0);
  const emi = Number(memory.emi || 0);
  const goal = Number(memory.goal || 0);

  const savings = income - expenses - emi;
  const savingsRate = income ? Math.round((savings / income) * 100) : 0;
  const emiLoad = income ? Math.round((emi / income) * 100) : 0;

  const plan = [];

  if (emiLoad > 35) plan.push("Reduce EMI before taking new loans.");
  if (savings > 0) plan.push(`Save ₹${Math.round(savings * 0.5)} monthly.`);
  if (goal > 0 && savings > 0) {
    plan.push(`Goal ₹${goal} can be reached in around ${Math.ceil(goal / savings)} months.`);
  }
  plan.push("Keep emergency fund before major purchases.");

  return {
    agent: "AI CFP Financial Planner",
    reply: `AI CFP plan ready. Savings ₹${savings}/month, savings rate ${savingsRate}%, EMI load ${emiLoad}%.`,
    data: {
      type: "ai_cfp",
      income,
      expenses,
      emi,
      goal,
      savings,
      savingsRate,
      emiLoad,
      verdict:
        emiLoad > 35
          ? "Debt pressure is high."
          : savingsRate >= 25
          ? "Strong financial position."
          : "Needs better savings discipline.",
      plan,
    },
  };
}