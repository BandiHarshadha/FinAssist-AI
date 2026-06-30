import { getMemory } from "../memory/userProfileMemory.js";

const rupees = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;
const percent = (value) => Math.round(value || 0);

export function aiCfpAgent() {
  const memory = getMemory();

  const income = Number(memory.income || 0);
  const expenses = Number(memory.expenses || 0);
  const emi = Number(memory.emi || 0);
  const goal = memory.goal || "Not set";
  const targetAmount = Number(memory.targetAmount || 0);

  const monthlySavings = income - expenses - emi;
  const savingsRate = income > 0 ? (monthlySavings / income) * 100 : 0;
  const emiLoad = income > 0 ? (emi / income) * 100 : 0;
  const emergencyFundTarget = (expenses + emi) * 6;

  let risk = "Stable";
  if (monthlySavings <= 0 || emiLoad >= 50) risk = "High Risk";
  else if (savingsRate < 20 || emiLoad >= 35) risk = "Moderate Risk";

  let healthScore = 100;
  if (income === 0) healthScore -= 40;
  if (monthlySavings <= 0) healthScore -= 20;
  if (savingsRate < 20) healthScore -= 20;
  else if (savingsRate < 30) healthScore -= 10;
  if (emiLoad > 50) healthScore -= 30;
  else if (emiLoad > 35) healthScore -= 15;
  healthScore = Math.max(0, Math.min(100, healthScore));

  let riskColor = "green";
  if (risk === "Moderate Risk") riskColor = "orange";
  if (risk === "High Risk") riskColor = "red";

  let grade = "A";
  if (healthScore < 90) grade = "B";
  if (healthScore < 75) grade = "C";
  if (healthScore < 60) grade = "D";
  if (healthScore < 40) grade = "E";

  const recommendations = [];
  const nextActions = [];

  if (!income) {
    recommendations.push("Add your monthly income first.");
    nextActions.push("Enter income, expenses, EMI, and goal details.");
  }

  if (monthlySavings <= 0) {
    recommendations.push("Your savings are low or negative right now.");
    recommendations.push("Avoid taking new loans or EMIs.");
    recommendations.push("Reduce unnecessary expenses immediately.");
    nextActions.push("Pause non-essential purchases.");
    nextActions.push("Reduce discretionary spending this month.");
  }

  if (savingsRate >= 20) {
    recommendations.push("You are saving a healthy part of your income.");
  }

  if (savingsRate < 20 && income > 0) {
    recommendations.push("Try to save at least 20 percent of your income.");
    nextActions.push("Increase monthly savings step by step.");
  }

  if (emiLoad > 40) {
    recommendations.push("Your EMI load is high and needs attention.");
    nextActions.push("Try to reduce or prepay high-interest loans.");
  }

  if (emiLoad < 30 && income > 0) {
    recommendations.push("Your EMI load is under control.");
  }

  if (monthlySavings > 10000) {
    recommendations.push("You can consider SIP investments after emergency fund basics.");
    nextActions.push("Start small SIP investments after building basic safety fund.");
  }

  if (monthlySavings > 25000) {
    recommendations.push("Your goal can be achieved faster with disciplined saving.");
  }

  if (emergencyFundTarget > 0) {
    recommendations.push(`Build an emergency fund of ${rupees(emergencyFundTarget)}.`);
    nextActions.push("Build your emergency fund before risky investments.");
  }

  const goalMonths =
    targetAmount > 0 && monthlySavings > 0
      ? Math.ceil(targetAmount / monthlySavings)
      : null;

  const goalTimeline = goalMonths ? `${goalMonths} months` : "Unavailable";

  return {
    agent: "Financial Planning Review",
    title: "Your Financial Plan",

    reply: `📊 Your Financial Plan

💰 Money In
Income: ${rupees(income)}

💸 Money Out
Expenses: ${rupees(expenses)}
EMI: ${rupees(emi)}

✅ Monthly Balance
Savings: ${rupees(monthlySavings)}
Savings Rate: ${percent(savingsRate)}%

💳 Loan Pressure
EMI Load: ${percent(emiLoad)}%

❤️ Financial Health
Score: ${healthScore}/100
Grade: ${grade}
Risk Level: ${risk}

🎯 Goal Planning
Goal: ${goal}
Target Amount: ${rupees(targetAmount)}
Timeline: ${goalTimeline}

🛡️ Safety Fund
Required Emergency Fund: ${rupees(emergencyFundTarget)}

✅ What You Are Doing Well
${recommendations.map((item) => `• ${item}`).join("\n")}

🚀 Next Best Steps
${nextActions.map((item) => `• ${item}`).join("\n")}`,

    data: {
      income,
      expenses,
      emi,
      monthlySavings,
      savingsRate: percent(savingsRate),
      emiLoad: percent(emiLoad),
      healthScore,
      grade,
      risk,
      riskColor,
      goal,
      targetAmount,
      emergencyFundTarget,
      goalMonths,
      goalTimeline,
      recommendations,
      nextActions,
    },
  };
}