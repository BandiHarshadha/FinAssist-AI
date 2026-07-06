export function aiCfpAgent(twin = {}) {
  const income = Number(twin?.monthlyIncome || 0);
  const expenses = Number(twin?.monthlyExpenses || 0);
  const emi = Number(twin?.totalEmi || 0);
  const savings = Number(twin?.monthlySavings || 0);
  const savingsRate = Number(twin?.savingsRate || 0);
  const emiRatio = Number(twin?.emiRatio || 0);
  const netWorth = Number(twin?.netWorth || 0);
  const score = Number(twin?.financialScore || 0);
  const risk = twin?.riskLevel || "Unknown";

  if (!income) {
    return {
      agent: "AI CFP Financial Planner",
      reply: "Please complete your Financial Profile first.",
      data: { type: "missing_financial_profile" },
    };
  }

  const emergencyFundTarget = expenses * 6;
  const investmentCapacity = Math.max(0, Math.round(savings * 0.4));

  return {
    agent: "AI CFP Financial Planner",
    reply: "Your AI CFP Financial Plan is ready.",
    data: {
      type: "ai_cfp_card",
      title: "AI CFP Financial Plan",
      score,
      riskLevel: risk,
      netWorth,
      summary: [
        ["Financial Score", `${score}/100`],
        ["Risk Level", risk],
        ["Net Worth", netWorth],
        ["Monthly Savings", savings],
        ["Savings Rate", `${savingsRate}%`],
        ["EMI Load", `${emiRatio}%`],
      ],
      budget: [
        ["Income", income, income],
        ["Expenses", expenses, income * 0.45],
        ["EMI", emi, income * 0.3],
        ["Savings", savings, income * 0.25],
      ],
      emergencyFund: [
        ["Monthly Expenses", expenses],
        ["Emergency Fund Target", emergencyFundTarget],
        ["Priority", savings < expenses ? "High" : "Medium"],
      ],
      investmentPlan: [
        ["SIP / Mutual Funds", investmentCapacity * 0.6],
        ["FD / Emergency Fund", investmentCapacity * 0.25],
        ["Gold / Conservative Assets", investmentCapacity * 0.15],
      ],
      actionPlan: [
        "Track expenses and avoid new unnecessary EMIs",
        "Build emergency fund for at least 6 months",
        "Start SIP/investments from monthly surplus",
      ],
      finalAdvice:
        score >= 80
          ? "You are financially strong. Focus on wealth creation, tax planning and goal-based investing."
          : score >= 60
          ? "You are stable, but should improve emergency fund and savings consistency."
          : "First stabilize finances by reducing debt and building emergency savings.",
    },
  };
}