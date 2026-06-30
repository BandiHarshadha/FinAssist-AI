import { getMemory } from "../memory/userProfileMemory.js";

const rupees = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

function extractAmount(text) {
  const match = String(text || "").match(/\d+/g);
  if (!match) return 0;
  return Number(match.join(""));
}

export function buyingDecisionAgent(message) {
  const memory = getMemory();

  const income = Number(memory.income || 0);
  const expenses = Number(memory.expenses || 0);
  const emi = Number(memory.emi || 0);

  const monthlySavings = income - expenses - emi;
  const itemCost = extractAmount(message);

  if (!itemCost) {
    return {
      agent: "Buying Decision",
      reply:
        "Tell me the item price also. Example: Can I buy a laptop worth ₹50000?",
    };
  }

  let decision = "Wait";
  let mood = "⚠️";
  let reason = "This purchase may affect your monthly savings.";

  if (monthlySavings <= 0) {
    decision = "Do Not Buy Now";
    mood = "🚫";
    reason =
      "Your monthly savings are zero or negative, so this purchase can create financial pressure.";
  } else if (itemCost <= monthlySavings * 0.3) {
    decision = "Safe to Buy";
    mood = "✅";
    reason =
      "The cost is within a safe limit compared to your monthly savings.";
  } else if (itemCost <= monthlySavings * 0.6) {
    decision = "Buy Carefully";
    mood = "⚠️";
    reason =
      "You can buy it, but it will reduce a large part of your monthly savings.";
  } else {
    decision = "Wait and Save";
    mood = "⏳";
    reason =
      "The item cost is high compared to your monthly savings. Saving for a few months is safer.";
  }

  const monthsNeeded =
    monthlySavings > 0 ? Math.ceil(itemCost / monthlySavings) : null;

  return {
    agent: "Buying Decision",
    reply: `${mood} Buying Decision

Item Cost: ${rupees(itemCost)}
Monthly Savings: ${rupees(monthlySavings)}

Decision: ${decision}

Reason:
${reason}

Smart Suggestion:
${
  monthsNeeded
    ? `If you save your monthly surplus, you can afford this in around ${monthsNeeded} month(s).`
    : "First create positive monthly savings before making this purchase."
}

Rule:
Avoid spending more than 30% to 40% of your monthly savings on non-essential purchases.`,
    data: {
      itemCost,
      monthlySavings,
      decision,
      reason,
      monthsNeeded,
    },
  };
}