import { createRequire } from "module";
const require = createRequire(import.meta.url);
const taxKnowledge = require("../knowledge/tax.json");
import { extractAmount, formatINR } from "../utils/financeFormat.js";
import { estimateNewRegimeTax, estimateOldRegimeTax } from "../tools/taxCalculator.js";

export function taxAgent(message = "", profile = {}) {
  const amount = extractAmount(message) || Number(profile.annualIncome || 0) || Number(profile.income || 0) * 12;

  if (!amount) {
    return {
      agent: "Tax Agent",
      reply: `I can help estimate tax and explain ITR, Form 16, old regime vs new regime, 80C, 80D, HRA and deductions.

Please share your annual income and whether you have deductions like 80C, 80D, home loan, HRA, or education loan interest.`,
      data: { type: "tax_questions" },
    };
  }

  const oldTax = estimateOldRegimeTax(amount);
  const newTax = estimateNewRegimeTax(amount);

  return {
    agent: "Tax Agent",
    reply: `For an estimated taxable income of ${formatINR(amount)}:

• Old regime estimated tax: ${formatINR(oldTax)}
• New regime estimated tax: ${formatINR(newTax)}

This is only a rough planning estimate. Actual tax depends on financial year, deductions, salary structure, HRA, standard deduction, and exemptions.

Common tax terms I can explain: ${taxKnowledge.common_terms.join(", ")}.`,
    data: { type: "tax_estimate", taxableIncome: amount, oldTax, newTax },
  };
}
