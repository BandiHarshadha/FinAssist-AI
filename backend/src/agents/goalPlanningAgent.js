export const goalPlanningAgent = (memory) => {
  const targetAmount = memory.targetAmount || 0;
  const monthlySavings = (memory.income || 0) - (memory.expenses || 0) - (memory.emi || 0);

  if (!targetAmount || !monthlySavings) {
    return {
      agent: "Goal Planning Agent",
      reply: "Please provide target amount, income, expenses and EMI to create a goal plan."
    };
  }

  const monthsRequired = Math.ceil(targetAmount / monthlySavings);
  const yearsRequired = (monthsRequired / 12).toFixed(1);

  return {
    agent: "Goal Planning Agent",
    targetAmount,
    monthlySavings,
    monthsRequired,
    yearsRequired,
    reply: `To reach ₹${targetAmount}, with monthly savings of ₹${monthlySavings}, you need around ${monthsRequired} months (${yearsRequired} years).`
  };
};