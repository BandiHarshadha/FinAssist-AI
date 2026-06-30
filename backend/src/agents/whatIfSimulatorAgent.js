import { getMemory } from "../memory/userProfileMemory.js";
import { rupees, makeVoiceSafe } from "../utils/spokenFormat.js";

function extractAmount(text) {
  const match = String(text || "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function whatIfSimulatorAgent(transcript) {
  const memory = getMemory();

  const income = Number(memory.income || 0);
  const expenses = Number(memory.expenses || 0);
  const emi = Number(memory.emi || 0);
  const goalAmount = Number(memory.targetAmount || 0);

  const currentSavings = income - expenses - emi;
  const extraCost = extractAmount(transcript);
  const newSavings = currentSavings - extraCost;

  let goalImpact = "Goal impact is not available yet.";

  if (goalAmount > 0 && currentSavings > 0) {
    const currentMonths = Math.ceil(goalAmount / currentSavings);

    if (newSavings > 0) {
      const newMonths = Math.ceil(goalAmount / newSavings);
      const delay = newMonths - currentMonths;

      goalImpact = `Your goal may be delayed by about ${delay} months.`;
    } else {
      goalImpact = "Your goal becomes difficult with this expense.";
    }
  }

  const reply = `
What If Simulator is running.
Current monthly savings are ${rupees(currentSavings)}.
This decision costs ${rupees(extraCost)}.
After this, your savings become ${rupees(newSavings)}.
${goalImpact}
`;

  return {
    agent: "What If Simulator Agent",
    data: {
      currentSavings,
      extraCost,
      newSavings,
      goalAmount,
    },
    reply: makeVoiceSafe(reply),
  };
}