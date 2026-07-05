import { getMonthlyProfile, formatINR, extractAmount } from "../utils/financeFormat.js";

export function investmentSpecialistAgent(message = "", profile = {}) {
  const money = getMonthlyProfile(profile);
  const amount = extractAmount(message);
  const text = message.toLowerCase();

  const agent = text.includes("stock") ? "Stock Agent" : text.includes("mutual") || text.includes("sip") ? "Mutual Fund Agent" : "Investment Agent";

  if (!money.income && !amount) {
    return {
      agent,
      reply: `I can help you invest safely.

Before suggesting anything, tell me:
• Monthly income
• Monthly expenses
• Existing EMI
• Monthly investment amount
• Risk comfort: low, moderate, or high
• Goal: emergency fund, house, car, retirement, wealth creation`,
      data: { type: "investment_questions" },
    };
  }

  const investable = amount || Math.max(0, Math.round(money.savings * 0.4));

  return {
    agent,
    reply: `A practical investment plan should start only after emergency fund.

Based on what I know:
• Monthly savings: ${formatINR(money.savings)}
• Suggested starting investment: around ${formatINR(investable)}

Beginner allocation idea:
• Emergency fund: FD/savings account
• Long-term goals: SIP in mutual funds
• Stability: FD/RD/debt funds
• Avoid direct stocks until you understand risk

Tell me your time period and risk level, and I’ll make a proper allocation.`,
    data: { type: "investment_plan", suggestedInvestment: investable, ...money },
  };
}
