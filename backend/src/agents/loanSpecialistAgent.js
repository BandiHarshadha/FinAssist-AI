import { createRequire } from "module";
const require = createRequire(import.meta.url);
const loanKnowledge = require("../knowledge/loans.json");
import { getMonthlyProfile, formatINR, extractAmount } from "../utils/financeFormat.js";

function loanName(message) {
  const text = message.toLowerCase();
  if (text.includes("home")) return "Home Loan Agent";
  if (text.includes("car") || text.includes("vehicle") || text.includes("bike")) return "Vehicle Loan Agent";
  if (text.includes("education") || text.includes("study")) return "Education Loan Agent";
  if (text.includes("gold")) return "Gold Loan Agent";
  return "Loan Agent";
}

export function loanSpecialistAgent(message = "", profile = {}) {
  const money = getMonthlyProfile(profile);
  const amount = extractAmount(message);
  const agent = loanName(message);

  if (!amount) {
    return {
      agent,
      reply: `I can calculate loan safety for you.

Please share:
• Loan amount
• Interest rate
• Tenure in years/months
• Your monthly income and existing EMI

Safe rule: ${loanKnowledge.safe_emi_rule}`,
      data: { type: "loan_questions" },
    };
  }

  return {
    agent,
    reply: `You are checking a loan of ${formatINR(amount)}.

${loanKnowledge.safe_emi_rule}

Based on your saved profile:
• Monthly income: ${formatINR(money.income)}
• Existing EMI: ${formatINR(money.emi)}
• Current EMI load: ${money.emiLoad}%

Documents usually needed: ${loanKnowledge.documents.join(", ")}.

Share interest rate and tenure, and I’ll calculate exact EMI and safe/unsafe verdict.`,
    data: { type: "loan_planning", loanAmount: amount, ...money },
  };
}
