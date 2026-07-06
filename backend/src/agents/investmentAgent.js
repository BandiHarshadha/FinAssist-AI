const money = (v) => `₹${Math.round(Number(v || 0)).toLocaleString("en-IN")}`;

export function investmentAgent(message, twin = {}) {
  const income = Number(twin.monthlyIncome || 0);
  const savings = Number(twin.monthlySavings || 0);
  const risk = twin.riskLevel || "Unknown";
  const investments = Number(twin.activeInvestments || 0);

  if (!income) {
    return {
      agent: "Investment Agent",
      reply:
        "Please add your monthly income in Financial Profile first. Then I can suggest investment options based on your real savings.",
      data: { type: "missing_income" },
    };
  }

  const suggestedSip = Math.max(0, Math.round(savings * 0.4));

  return {
    agent: "Investment Agent",
    reply: `
📈 **Investment Recommendation**

💰 You can consider investing around **${money(suggestedSip)} per month**.

📊 **Based on your Digital Twin**
• Monthly Income: ${money(income)}
• Monthly Savings: ${money(savings)}
• Current Investments: ${investments}
• Risk Level: ${risk}

💡 **Suggested Split**
• 50% Mutual Funds / SIP
• 25% Emergency Fund
• 15% Gold or FD
• 10% Learning / Upskilling

⚠️ Start only after keeping at least **3–6 months emergency fund**.
`,
    data: {
      type: "investment_plan",
      suggestedSip,
      savings,
      risk,
      investments,
    },
  };
}