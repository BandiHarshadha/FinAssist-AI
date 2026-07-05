export const budgetAnalyzer = (monthlyIncome, monthlyExpenses = 0) => {
  const savings = monthlyIncome - monthlyExpenses;
  const savingsRate = (savings / monthlyIncome) * 100;

  let status = "Healthy";

  if (savingsRate < 10) status = "Risky";
  else if (savingsRate < 25) status = "Moderate";

  return {
    monthlyIncome,
    monthlyExpenses,
    savings,
    savingsRate: savingsRate.toFixed(2),
    status,
  };
};