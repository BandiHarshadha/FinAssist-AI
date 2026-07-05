import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fraudKnowledge = require("../knowledge/fraud.json");

export function fraudAgent() {
  return {
    agent: "Fraud Safety Agent",
    reply: `This may be risky, so please be careful.

Red flags:
${fraudKnowledge.red_flags.map((x) => `• ${x}`).join("\n")}

What to do now:
${fraudKnowledge.action_steps.map((x) => `• ${x}`).join("\n")}

Never share OTP, UPI PIN, card PIN, CVV, net banking password, or remote access permission.`,
    data: { type: "fraud_safety" },
  };
}
