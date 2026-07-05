import { createRequire } from "module";
const require = createRequire(import.meta.url);
const insuranceKnowledge = require("../knowledge/insurance.json");
import { getMonthlyProfile, formatINR } from "../utils/financeFormat.js";

export function insuranceSpecialistAgent(message = "", profile = {}) {
  const money = getMonthlyProfile(profile);
  const termCover = money.income ? money.income * 12 * 10 : 0;

  return {
    agent: "Insurance Agent",
    reply: `Insurance protects your financial plan from sudden shocks.

Priority order:
${insuranceKnowledge.priority.map((x) => `• ${x}`).join("\n")}

${money.income ? `Based on your income, a simple starting term cover estimate is around ${formatINR(termCover)}.` : "If you share your income and family dependency, I can estimate term cover."}

Rule: ${insuranceKnowledge.term_cover_rule}`,
    data: { type: "insurance_plan", suggestedTermCover: termCover || null },
  };
}
