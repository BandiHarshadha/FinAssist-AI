import { extractAmount, formatINR } from "../utils/financeFormat.js";

export function fdRdAgent(message = "") {
  const text = message.toLowerCase();
  const amount = extractAmount(message);
  const isRD = text.includes("rd") || text.includes("recurring");

  if (!amount) {
    return {
      agent: isRD ? "RD Agent" : "FD Agent",
      reply: `I can calculate ${isRD ? "RD" : "FD"} maturity.

Please share amount, interest rate, and tenure. Example: "FD 1 lakh for 2 years at 7%" or "RD 5000 monthly for 12 months at 6.5%".`,
      data: { type: isRD ? "rd_questions" : "fd_questions" },
    };
  }

  return {
    agent: isRD ? "RD Agent" : "FD Agent",
    reply: `${isRD ? "RD" : "FD"} is good for safe, short-term or low-risk goals.

You mentioned ${formatINR(amount)}. Share interest rate and tenure to calculate exact maturity.

General use:
• FD: lump sum safe parking
• RD: monthly disciplined saving
• SIP: long-term wealth creation with market risk`,
    data: { type: isRD ? "rd_help" : "fd_help", amount },
  };
}
