export function formatINR(amount = 0) {
  const value = Number(amount || 0);
  return `₹${value.toLocaleString("en-IN")}`;
}

export function extractAmount(text = "") {
  const lower = String(text).toLowerCase();

  const croreMatch = lower.match(/(\d+(?:\.\d+)?)\s*(crore|crores|cr)/);
  if (croreMatch) return Math.round(Number(croreMatch[1]) * 10000000);

  const lakhMatch = lower.match(/(\d+(?:\.\d+)?)\s*(lakh|lakhs|lac|lacs|l)/);
  if (lakhMatch) return Math.round(Number(lakhMatch[1]) * 100000);

  const rupeeMatch = lower.match(/(?:₹|rs\.?|inr)?\s*(\d+(?:,\d{2,3})*(?:\.\d+)?|\d+(?:\.\d+)?)/);
  if (!rupeeMatch) return 0;

  return Number(String(rupeeMatch[1]).replace(/,/g, ""));
}

export function getMonthlyProfile(profile = {}) {
  const income = Number(profile.income || profile.monthlyIncome || 0);
  const expenses = Number(profile.expenses || profile.monthlyExpenses || 0);
  const emi = Number(profile.emi || profile.monthlyEmi || 0);
  const savings = income - expenses - emi;
  const savingsRate = income ? Math.round((savings / income) * 100) : 0;
  const emiLoad = income ? Math.round((emi / income) * 100) : 0;

  return { income, expenses, emi, savings, savingsRate, emiLoad };
}

export function friendlyMissingProfile(domain = "this") {
  return `Absolutely, I can help you with ${domain}. Before giving a proper recommendation, please share your monthly income, expenses, existing EMI, and your main goal. Then I’ll give a safer personalized answer.`;
}
