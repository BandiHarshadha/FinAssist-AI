import { getMemory } from "../memory/userProfileMemory.js";
import { rupees, makeVoiceSafe } from "../utils/spokenFormat.js";

function safeNumber(value) {
  return Number(value || 0);
}

function calculateHealthScore({ income, expenses, emi, savingsRate }) {
  let score = 100;

  if (income <= 0) score -= 40;
  if (expenses > income * 0.5) score -= 20;
  if (emi > income * 0.4) score -= 25;
  if (savingsRate < 20) score -= 20;
  if (savingsRate >= 40) score += 5;

  return Math.max(0, Math.min(100, score));
}

function getRiskLevel(score) {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "moderate";
  return "high risk";
}

export function financialDigitalTwinAgent() {
  const memory = getMemory();

  const income = safeNumber(memory.income);
  const expenses = safeNumber(memory.expenses);
  const emi = safeNumber(memory.emi);
  const goalAmount = safeNumber(memory.targetAmount);

  const monthlySavings = income - expenses - emi;
  const savingsRate = income > 0 ? Math.round((monthlySavings / income) * 100) : 0;
  const emiRate = income > 0 ? Math.round((emi / income) * 100) : 0;

  const healthScore = calculateHealthScore({
    income,
    expenses,
    emi,
    savingsRate,
  });

  const riskLevel = getRiskLevel(healthScore);

  let goalTimeline = "Goal timeline is not available yet.";

  if (goalAmount > 0 && monthlySavings > 0) {
    const months = Math.ceil(goalAmount / monthlySavings);
    goalTimeline = `You can reach your goal in about ${months} months.`;
  }

  const reply = `
Your Financial Digital Twin is ready.
Your income is ${rupees(income)}.
Your expenses are ${rupees(expenses)}.
Your EMI is ${rupees(emi)}.
Your monthly savings are ${rupees(monthlySavings)}.
Your savings rate is ${savingsRate} percent.
Your EMI load is ${emiRate} percent.
Your financial health score is ${healthScore} out of one hundred.
Your current risk level is ${riskLevel}.
${goalTimeline}
`;

  return {
    agent: "Financial Digital Twin Agent",
    data: {
      income,
      expenses,
      emi,
      monthlySavings,
      savingsRate,
      emiRate,
      healthScore,
      riskLevel,
      goalAmount,
    },
    reply: makeVoiceSafe(reply),
  };
}