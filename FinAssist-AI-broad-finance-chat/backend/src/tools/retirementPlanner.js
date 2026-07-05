export function estimateRetirementCorpus({ monthlyExpense = 0, yearsAfterRetirement = 25 }) {
  const annualExpense = Number(monthlyExpense || 0) * 12;
  return Math.round(annualExpense * Number(yearsAfterRetirement || 25));
}
