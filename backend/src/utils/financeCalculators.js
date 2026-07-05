export function calculateEMI(principal, annualRate, months) {
  const P = Number(principal);
  const R = Number(annualRate) / 12 / 100;
  const N = Number(months);

  if (!P || !annualRate || !N) return null;

  const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  const totalPayment = emi * N;
  const totalInterest = totalPayment - P;

  return {
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
  };
}

export function checkAffordability({ income, expenses, existingEmi, newEmi }) {
  const monthlyIncome = Number(income || 0);
  const monthlyExpenses = Number(expenses || 0);
  const currentEmi = Number(existingEmi || 0);
  const proposedEmi = Number(newEmi || 0);

  const totalEmi = currentEmi + proposedEmi;
  const emiRatio = monthlyIncome ? (totalEmi / monthlyIncome) * 100 : 0;
  const remainingSavings = monthlyIncome - monthlyExpenses - totalEmi;

  let decision = "SAFE";

  if (emiRatio > 40 || remainingSavings < 0) {
    decision = "RISKY";
  } else if (emiRatio > 30) {
    decision = "MODERATE";
  }

  return {
    totalEmi,
    emiRatio: Math.round(emiRatio),
    remainingSavings,
    decision,
  };
}
export function calculateGoalPlan(goalAmount, monthlySavings) {
  const goal = Number(goalAmount || 0);
  const savings = Number(monthlySavings || 0);

  if (!goal || !savings) return null;

  const months = Math.ceil(goal / savings);
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  return {
    goalAmount: goal,
    monthlySavings: savings,
    months,
    years,
    remainingMonths,
  };
}