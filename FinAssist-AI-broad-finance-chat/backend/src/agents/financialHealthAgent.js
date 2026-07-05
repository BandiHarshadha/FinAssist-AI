export const financialHealthAgent = (memory) => {
  const income = memory.income || 0;
  const expenses = memory.expenses || 0;
  const emi = memory.emi || 0;

  if (!income) {
    return {
      agent: "Financial Health Agent",
      reply: "Please provide income, expenses, and EMI to calculate financial health score."
    };
  }

  const savings = income - expenses - emi;
  const savingsRate = (savings / income) * 100;
  const debtRatio = (emi / income) * 100;

  let score = 50;

  if (savingsRate >= 40) score += 30;
  else if (savingsRate >= 25) score += 20;
  else if (savingsRate >= 10) score += 10;
  else score -= 10;

  if (debtRatio <= 20) score += 20;
  else if (debtRatio <= 35) score += 10;
  else score -= 10;

  score = Math.max(0, Math.min(100, score));

  let status = "Average";
  if (score >= 80) status = "Excellent";
  else if (score >= 60) status = "Good";
  else if (score < 40) status = "Poor";

  return {
    agent: "Financial Health Agent",
    score,
    status,
    savings,
    savingsRate: savingsRate.toFixed(1),
    debtRatio: debtRatio.toFixed(1),
    reply: `Financial Health Score: ${score}/100 (${status}). Monthly savings: ₹${savings}. Savings rate: ${savingsRate.toFixed(1)}%. Debt ratio: ${debtRatio.toFixed(1)}%.`
  };
};