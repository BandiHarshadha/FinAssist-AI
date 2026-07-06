const money = (v) => `₹${Math.round(Number(v || 0)).toLocaleString("en-IN")}`;

export function savingsAgent(message, twin = {}) {
  const income = Number(twin.monthlyIncome || 0);
  const expenses = Number(twin.monthlyExpenses || 0);
  const emi = Number(twin.totalEmi || 0);
  const savings = Number(twin.monthlySavings || 0);
  const savingsRate = Number(twin.savingsRate || 0);

  if (!income) {
    return {
      agent: "Savings Agent",
      reply:
        "Please add your monthly income in Financial Profile. Then I can calculate your monthly savings automatically.",
      data: { type: "missing_income" },
    };
  }

  return {
    agent: "Savings Agent",
    reply: `
💰 **Savings Analysis**

✅ **Monthly Savings:** ${money(savings)}

📊 **Your Snapshot**
• Income: ${money(income)}
• Expenses: ${money(expenses)}
• EMI: ${money(emi)}
• Savings Rate: ${savingsRate}%

💡 **My Advice**
${
  savingsRate >= 30
    ? "Excellent! Your savings rate is strong. You can start goal-based investing."
    : savingsRate >= 15
    ? "Good, but you can improve by reducing unnecessary spending."
    : "Your savings rate is low. First reduce expenses or EMI burden."
}

🎯 **Next Step**
Try to maintain at least **20–30% savings rate** every month.
`,
      data: {
        type: "savings_analysis",
        income,
        expenses,
        emi,
        savings,
        savingsRate,
      },
    };
}