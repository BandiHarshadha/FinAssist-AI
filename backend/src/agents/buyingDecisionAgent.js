const money = (v) => `₹${Math.round(Number(v || 0)).toLocaleString("en-IN")}`;

export function buyingDecisionAgent(message, twin = {}) {
  const savings = Number(twin.monthlySavings || 0);
  const emiRatio = Number(twin.emiRatio || 0);
  const score = Number(twin.financialScore || 0);

  if (!twin.monthlyIncome) {
    return {
      agent: "Buying Decision Agent",
      reply:
        "Please add your income and expenses in Financial Profile. Then I can tell whether buying is safe or risky.",
      data: { type: "missing_profile" },
    };
  }

  return {
    agent: "Buying Decision Agent",
    reply: `
🛒 **Buying Decision Check**

📊 **Current Capacity**
• Monthly Savings: ${money(savings)}
• EMI Ratio: ${emiRatio}%
• Financial Score: ${score}/100

✅ **Safe Rule**
You can buy comfortably if the EMI or monthly cost is below **30–40% of your monthly savings**.

💡 **My Advice**
${
  emiRatio > 35
    ? "Avoid taking new EMI right now. Your current EMI burden is already high."
    : savings > 0
    ? "You can buy, but keep emergency savings untouched."
    : "Wait for now. Build monthly savings first."
}
`,
    data: {
      type: "buying_decision",
      savings,
      emiRatio,
      score,
    },
  };
}