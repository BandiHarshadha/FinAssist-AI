import { createRequire } from "module";
const require = createRequire(import.meta.url);
const savingsKnowledge = require("../knowledge/savings.json");
import { getMonthlyProfile, formatINR } from "../utils/financeFormat.js";

export function savingsAgent(message, profile = {}) {
  const money = getMonthlyProfile(profile);

  if (!money.income) {
    return {
      agent: "Savings Agent",
      reply: `Absolutely, I can help you plan savings.

To create your savings plan, tell me:
• Monthly income
• Monthly expenses
• Existing EMI
• Your goal amount

For savings accounts, usually required documents are ${savingsKnowledge.opening_account.documents.join(", ")}.`,
      data: { type: "savings_help" },
    };
  }

  return {
    agent: "Savings Agent",
    reply: `Your estimated monthly savings are ${formatINR(money.savings)}.

Your savings rate is ${money.savingsRate}%, which shows how much of your income is staying with you after expenses and EMI.

A practical plan:
• First build an emergency fund of 3–6 months expenses.
• Keep goal money separate from daily spending money.
• Automate savings after salary comes.
• Use FD/RD for short-term goals and SIPs for long-term goals.

For a savings account, common documents are ${savingsKnowledge.opening_account.documents.join(", ")}.`,
    data: { type: "savings_plan", ...money },
  };
}
