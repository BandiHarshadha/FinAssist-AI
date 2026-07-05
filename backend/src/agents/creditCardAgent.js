import { createRequire } from "module";
const require = createRequire(import.meta.url);
const creditKnowledge = require("../knowledge/creditcards.json");
import { getMonthlyProfile, formatINR } from "../utils/financeFormat.js";
import { estimateCreditScore } from "../tools/creditScoreEstimator.js";

export function creditCardAgent(message, profile = {}) {
  const money = getMonthlyProfile(profile);
  const estimate = estimateCreditScore({ emiLoad: money.emiLoad, hasCreditHistory: false });

  if (!money.income) {
    return {
      agent: "Credit Card Agent",
      reply: `Absolutely! I can help you choose the right credit card.

Before recommending one, tell me:
• What is your monthly income?
• Do you already have loans or EMIs?
• Do you know your credit score?
• Main goal: cashback, travel, fuel, shopping, or building credit?

Then I’ll suggest the best type of card and explain why it fits you.`,
      data: { type: "credit_card_questions" },
    };
  }

  const safeLimit = Math.round(money.income * 0.5);

  return {
    agent: "Credit Card Agent",
    reply: `Yes, you may be eligible for a credit card if your income proof and bank checks are fine.

Based on your saved profile:
• Monthly income: ${formatINR(money.income)}
• Existing EMI load: ${money.emiLoad}%
• Estimated beginner credit score band: ${estimate.band}

Recommended card type:
• If you are new: beginner/no-fee credit card
• If you shop online: cashback card
• If you travel: travel/rewards card
• If you use fuel often: fuel card

Safe usage rules:
${creditKnowledge.safe_rules.map((rule) => `• ${rule}`).join("\n")}

A safe spending limit for you is around ${formatINR(safeLimit)} or lower, but try to use only 30–40% of the card limit.`,
    data: { type: "credit_card_eligibility", safeLimit, creditEstimate: estimate, ...money },
  };
}
