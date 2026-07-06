const money = (v) => `₹${Math.round(Number(v || 0)).toLocaleString("en-IN")}`;

export function loanAgent(message, twin = {}) {
  const income = Number(twin.monthlyIncome || 0);
  const emi = Number(twin.totalEmi || 0);
  const emiRatio = Number(twin.emiRatio || 0);
  const activeLoans = Number(twin.activeLoans || 0);
  const score = Number(twin.financialScore || 0);

  if (!income) {
    return {
      agent: "Loan Agent",
      reply:
        "Please add your monthly income in Financial Profile. Then I can check your loan eligibility personally.",
      data: { type: "missing_income" },
    };
  }

  let decision = "Loan eligibility looks moderate.";

  if (emiRatio <= 25 && score >= 75) {
    decision = "✅ You have a good chance of getting a loan.";
  } else if (emiRatio <= 40) {
    decision = "⚠️ You may get a loan, but approval amount may be limited.";
  } else {
    decision = "❌ Loan approval may be difficult right now because EMI burden is high.";
  }

  return {
    agent: "Loan Agent",
    reply: `
🏦 **Loan Eligibility Check**

${decision}

📊 **Your Profile**
• Monthly Income: ${money(income)}
• Current EMI: ${money(emi)}
• EMI Ratio: ${emiRatio}%
• Active Loans: ${activeLoans}
• Financial Score: ${score}/100

💡 **Suggestion**
${
  emiRatio > 40
    ? "Reduce existing EMI burden before applying for a new loan."
    : "You can compare banks/NBFCs and apply only where eligibility is strong."
}
`,
    data: {
      type: "loan_eligibility",
      income,
      emi,
      emiRatio,
      activeLoans,
      score,
    },
  };
}