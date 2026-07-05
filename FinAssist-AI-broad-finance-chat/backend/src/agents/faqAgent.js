export function faqAgent(message = "") {
  return {
    agent: "FAQ Agent",
    reply: `I can explain this in simple finance language.

Ask me about savings accounts, credit cards, debit cards, loans, EMI, FD, RD, SIP, mutual funds, insurance, tax, UPI, fraud safety, budgeting, or financial planning.

For a more personal answer, include your income, expenses, EMI, goal amount, and time period.`,
    data: { type: "finance_faq" },
  };
}
