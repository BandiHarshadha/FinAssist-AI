const num = (v) => Number(v || 0);

const active = (items = []) =>
  items.filter((item) => String(item.status || "Active").toLowerCase() === "active");

const percent = (part, total) =>
  total > 0 ? Math.round((part / total) * 100) : 0;

export function calculateDigitalTwin(user = {}) {
  const customer = user.customerProfile || {};

  const monthlyIncome =
    num(customer.monthlyIncome) ||
    num(user.monthlyIncome) ||
    Math.round((num(customer.annualIncome) || num(user.annualIncome)) / 12);

  const monthlyExpenses = num(customer.monthlyExpenses) || num(user.monthlyExpenses);

  const bankAccounts = active(user.bankAccounts || []);
  const creditCards = active(user.creditCards || []);
  const loans = active(user.loans || []);
  const investments = active(user.investments || []);
  const insurance = active(user.insurance || []);

  const totalBankBalance = bankAccounts.reduce(
    (sum, acc) => sum + num(acc.currentBalance || acc.availableBalance),
    0
  );

  const totalInvestmentValue = investments.reduce(
    (sum, inv) => sum + num(inv.currentValue || inv.investedAmount),
    0
  );

  const totalLoanOutstanding = loans.reduce(
    (sum, loan) => sum + num(loan.outstanding || loan.loanAmount),
    0
  );

  const totalEmi =
    loans.reduce((sum, loan) => sum + num(loan.emi), 0) || num(user.emi);

  const totalCreditLimit = creditCards.reduce(
    (sum, card) => sum + num(card.creditLimit),
    0
  );

  const totalCreditUsed = creditCards.reduce(
    (sum, card) => sum + num(card.usedLimit || card.outstandingAmount),
    0
  );

  const totalInsuranceCover = insurance.reduce(
    (sum, policy) => sum + num(policy.coverageAmount),
    0
  );

  const monthlyInsurancePremium = insurance.reduce(
    (sum, policy) => sum + num(policy.premium),
    0
  );

  const monthlySavings = monthlyIncome - monthlyExpenses - totalEmi - monthlyInsurancePremium;

  const totalAssets = totalBankBalance + totalInvestmentValue;
  const totalLiabilities = totalLoanOutstanding + totalCreditUsed;
  const netWorth = totalAssets - totalLiabilities;

  const emiRatio = percent(totalEmi, monthlyIncome);
  const savingsRate = percent(monthlySavings, monthlyIncome);
  const creditUtilization = percent(totalCreditUsed, totalCreditLimit);

  let financialScore = 50;

  if (savingsRate >= 30) financialScore += 20;
  else if (savingsRate >= 20) financialScore += 15;
  else if (savingsRate >= 10) financialScore += 8;
  else financialScore -= 10;

  if (emiRatio <= 20) financialScore += 15;
  else if (emiRatio <= 35) financialScore += 5;
  else financialScore -= 20;

  if (creditUtilization <= 30) financialScore += 10;
  else if (creditUtilization <= 50) financialScore += 2;
  else financialScore -= 15;

  if (netWorth > 0) financialScore += 10;
  else financialScore -= 10;

  if (totalInsuranceCover > 0) financialScore += 5;

  financialScore = Math.max(0, Math.min(100, financialScore));

  const riskLevel =
    financialScore >= 80
      ? "Low"
      : financialScore >= 60
      ? "Moderate"
      : "High";

  return {
    monthlyIncome,
    monthlyExpenses,
    monthlySavings,
    totalEmi,
    emiRatio,
    savingsRate,
    totalBankBalance,
    totalInvestmentValue,
    totalAssets,
    totalLoanOutstanding,
    totalCreditLimit,
    totalCreditUsed,
    totalLiabilities,
    netWorth,
    creditUtilization,
    totalInsuranceCover,
    monthlyInsurancePremium,
    activeLoans: loans.length,
    activeCreditCards: creditCards.length,
    activeInvestments: investments.length,
    activeInsurancePolicies: insurance.length,
    financialScore,
    riskLevel,
    updatedAt: new Date().toISOString(),
  };
}