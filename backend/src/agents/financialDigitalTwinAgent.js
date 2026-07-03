import { getMemory } from "../memory/userProfileMemory.js";

export function financialDigitalTwinAgent() {
  const memory = getMemory();

  const income = Number(memory.income || 0);
  const expenses = Number(memory.expenses || 0);
  const emi = Number(memory.emi || 0);
  const goal = Number(memory.goal || 0);

  const savings = income - expenses - emi;
  const savingsRate = income ? Math.round((savings / income) * 100) : 0;
  const emiLoad = income ? Math.round((emi / income) * 100) : 0;

  const healthScore = Math.max(
    0,
    Math.min(
      100,
      50 +
        (savingsRate >= 30 ? 25 : savingsRate >= 15 ? 10 : -10) -
        (emiLoad > 35 ? 20 : 0)
    )
  );

  const risk =
    emiLoad > 35 ? "High" : savingsRate >= 25 ? "Low" : "Moderate";

  return {
    agent: "Virtual Financial Digital Twin",
    reply: `Your financial twin is ready. Savings ₹${savings}/month, health score ${healthScore}/100, risk: ${risk}.`,
    data: {
      type: "digital_twin",
      income,
      expenses,
      emi,
      goal,
      savings,
      savingsRate,
      emiLoad,
      healthScore,
      risk,
      message:
        risk === "High"
          ? "High EMI pressure detected. Reduce debt before new purchases."
          : "Your financial position is stable. Keep protecting your savings.",
    },
  };
}