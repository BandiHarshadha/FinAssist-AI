const money = (v) => `₹${Math.round(Number(v || 0)).toLocaleString("en-IN")}`;

export function creditCardAgent(message, profile = {}) {
  const income = Number(profile.income || 0);
  const emi = Number(profile.emi || 0);
  const expenses = Number(profile.expenses || 0);
  const emiLoad = Number(profile.emiLoad || 0);
  const creditUtilization = Number(profile.creditUtilization || 0);
  const activeLoans = Number(profile.activeLoans || 0);
  const activeCreditCards = Number(profile.activeCreditCards || 0);
  const financialScore = Number(profile.financialScore || 0);
  const riskLevel = profile.riskLevel || "Unknown";

  if (!income) {
    return {
      agent: "Credit Card Agent",
      reply:
        "I can check your credit card eligibility, but please add your income in Financial Profile first. After that I will answer personally without asking again.",
      data: { type: "missing_income" },
    };
  }

  let decision = "";
  let reason = "";

  if (income >= 30000 && emiLoad <= 30 && creditUtilization <= 40) {
    decision = "Yes, you have a good chance of getting a credit card.";
    reason =
      "Your income, EMI load, and credit usage look healthy for credit card eligibility.";
  } else if (income >= 20000 && emiLoad <= 45) {
    decision = "You may get a basic or entry-level credit card.";
    reason =
      "Your income is acceptable, but EMI load or credit usage should be monitored.";
  } else {
    decision = "It may be difficult to get a credit card right now.";
    reason =
      "Your income, EMI burden, or credit utilization may reduce approval chances.";
  }

  return {
    agent: "Credit Card Agent",
    reply: `${decision}

Reason: ${reason}

Your profile check:
Income: ${money(income)}
Monthly EMI: ${money(emi)}
Monthly Expenses: ${money(expenses)}
EMI Ratio: ${emiLoad}%
Credit Utilization: ${creditUtilization}%
Active Loans: ${activeLoans}
Existing Credit Cards: ${activeCreditCards}
Financial Score: ${financialScore}/100
Risk Level: ${riskLevel}

My suggestion: ${
      creditUtilization > 40
        ? "Reduce card usage below 30% before applying for a new card."
        : activeCreditCards === 0
        ? "Start with a beginner-friendly lifetime-free card."
        : "You can compare reward cards, cashback cards, or travel cards based on your spending."
    }`,
    data: {
      type: "credit_card_eligibility",
      income,
      emi,
      expenses,
      emiLoad,
      creditUtilization,
      activeLoans,
      activeCreditCards,
      financialScore,
      riskLevel,
    },
  };
}