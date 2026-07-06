import User from "../models/User.js";
import { calculateDigitalTwin } from "../tools/digitalTwinCalculator.js";

export function financialDigitalTwinAgent(userId = null) {
  if (!userId) {
    return {
      agent: "Virtual Financial Digital Twin",
      reply: "Please login and complete your Financial Profile first.",
      data: { type: "digital_twin_missing_profile" },
    };
  }

  const user = User.findById(userId);
  const twin = calculateDigitalTwin(user);

  User.update(userId, {
    financialDigitalTwin: twin,
    savings: twin.monthlySavings,
    emi: twin.totalEmi,
  });

  return {
    agent: "Virtual Financial Digital Twin",
    reply: "Your Financial Digital Twin is ready.",
    data: {
      type: "digital_twin_card",
      title: "Financial Digital Twin",
      score: twin.financialScore,
      riskLevel: twin.riskLevel,
      netWorth: twin.netWorth,
      sections: [
        {
          title: "Cash Flow",
          rows: [
            ["Monthly Income", twin.monthlyIncome],
            ["Monthly Expenses", twin.monthlyExpenses],
            ["Monthly EMI", twin.totalEmi],
            ["Monthly Savings", twin.monthlySavings],
            ["Savings Rate", `${twin.savingsRate}%`],
          ],
        },
        {
          title: "Assets & Liabilities",
          rows: [
            ["Bank Balance", twin.totalBankBalance],
            ["Investments", twin.totalInvestmentValue],
            ["Total Assets", twin.totalAssets],
            ["Loan Outstanding", twin.totalLoanOutstanding],
            ["Total Liabilities", twin.totalLiabilities],
          ],
        },
        {
          title: "Credit Profile",
          rows: [
            ["Credit Limit", twin.totalCreditLimit],
            ["Credit Used", twin.totalCreditUsed],
            ["Credit Utilization", `${twin.creditUtilization}%`],
            ["Active Loans", twin.activeLoans],
            ["Active Credit Cards", twin.activeCreditCards],
          ],
        },
      ],
      insight:
        twin.financialScore >= 80
          ? "Your financial health is strong. Focus on investments, tax planning and wealth building."
          : twin.financialScore >= 60
          ? "Your financial health is moderate. Improve savings and reduce EMI pressure."
          : "Your financial health needs attention. Build savings and reduce liabilities first.",
    },
  };
}