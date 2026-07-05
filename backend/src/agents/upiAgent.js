import { createRequire } from "module";
const require = createRequire(import.meta.url);
const upiKnowledge = require("../knowledge/upi.json");

export function upiAgent(message = "") {
  const text = message.toLowerCase();

  if (text.includes("fraud") || text.includes("scam") || text.includes("wrong")) {
    return {
      agent: "UPI Agent",
      reply: `For UPI safety, act quickly.

Immediate steps:
• Do not share UPI PIN, OTP, CVV, or screen access.
• Check transaction status in your bank app.
• If money is wrongly debited, raise a dispute with bank/UPI app.
• For cyber fraud in India, report quickly through official cybercrime support or 1930.

Common UPI scam signs:
${upiKnowledge.safety.map((x) => `• ${x}`).join("\n")}`,
      data: { type: "upi_fraud_help" },
    };
  }

  return {
    agent: "UPI Agent",
    reply: `I can help with UPI payments, failed transactions, wrong transfer, UPI PIN, limits, and safety.

Important UPI safety rules:
${upiKnowledge.safety.map((x) => `• ${x}`).join("\n")}`,
    data: { type: "upi_help" },
  };
}
