import { getMemory, saveMemory, resetMemory } from "../memory/userProfileMemory.js";
import { rupees, makeVoiceSafe } from "../utils/spokenFormat.js";
import { finAssistVoiceBrain } from "./finAssistVoiceBrain.js";

let pendingMemoryUpdate = null;
let pendingReset = false;

function normalize(message) {
  return String(message || "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractAmountAfter(text, keywords) {
  for (const key of keywords) {
    const regex = new RegExp(`${key}[^0-9]*(\\d+)`, "i");
    const match = text.match(regex);

    if (match) {
      return Number(match[1]);
    }
  }

  return null;
}

function extractUpdates(raw) {
  return {
    income: extractAmountAfter(raw, ["income", "salary", "earn"]),
    expenses: extractAmountAfter(raw, [
      "expenses",
      "expense",
      "spend",
      "spending",
    ]),
    emi: extractAmountAfter(raw, ["emi"]),
    targetAmount: extractAmountAfter(raw, [
      "target",
      "save",
      "goal amount",
    ]),
    goal: /house/i.test(raw)
      ? "House"
      : /car/i.test(raw)
      ? "Car"
      : /emergency fund/i.test(raw)
      ? "Emergency Fund"
      : null,
  };
}

function hasAnyUpdate(updates) {
  return Object.values(updates).some(
    (value) => value !== null && value !== undefined
  );
}

function summarizeUpdate(updates) {
  const parts = [];

  if (updates.income !== null) {
    parts.push(`income to ${rupees(updates.income)}`);
  }

  if (updates.expenses !== null) {
    parts.push(`expenses to ${rupees(updates.expenses)}`);
  }

  if (updates.emi !== null) {
    parts.push(`EMI to ${rupees(updates.emi)}`);
  }

  if (updates.targetAmount !== null) {
    parts.push(`goal amount to ${rupees(updates.targetAmount)}`);
  }

  if (updates.goal) {
    parts.push(`goal to ${updates.goal}`);
  }

  return parts.join(" and ");
}

function buildMemoryText(updates) {
  const chunks = [];

  if (updates.income !== null) {
    chunks.push(`income is ${updates.income}`);
  }

  if (updates.expenses !== null) {
    chunks.push(`expenses are ${updates.expenses}`);
  }

  if (updates.emi !== null) {
    chunks.push(`emi is ${updates.emi}`);
  }

  if (updates.targetAmount !== null) {
    chunks.push(`target save ${updates.targetAmount}`);
  }

  if (updates.goal) {
    chunks.push(`goal is ${updates.goal}`);
  }

  return chunks.join(". ");
}

export async function voiceOrchestrator(transcript) {
  const raw = String(transcript || "").trim();
  const text = normalize(raw);
  const memory = getMemory();

  if (!raw) {
    return {
      agent: "Voice Orchestrator",
      reply: "I did not hear that clearly.",
    };
  }

  if (pendingReset) {
    if (text === "yes") {
      resetMemory();
      pendingReset = false;

      return {
        agent: "Memory Agent",
        reply: "Memory reset completed.",
      };
    }

    if (text === "no") {
      pendingReset = false;

      return {
        agent: "Memory Agent",
        reply: "Okay. Memory was not changed.",
      };
    }

    return {
      agent: "Memory Agent",
      reply: "Please say yes or no.",
    };
  }

  if (pendingMemoryUpdate) {
    if (text === "yes") {
      saveMemory(buildMemoryText(pendingMemoryUpdate));

      const reply = `Got it. I updated your ${summarizeUpdate(
        pendingMemoryUpdate
      )}.`;

      pendingMemoryUpdate = null;

      return {
        agent: "Memory Agent",
        reply: makeVoiceSafe(reply),
      };
    }

    if (text === "no") {
      pendingMemoryUpdate = null;

      return {
        agent: "Memory Agent",
        reply: "Okay. I did not change your memory.",
      };
    }

    return {
      agent: "Memory Agent",
      reply: "Please say yes or no.",
    };
  }

  if (text.includes("reset memory")) {
    pendingReset = true;

    return {
      agent: "Memory Agent",
      reply: "I can reset your memory. Please say yes or no.",
    };
  }

  if (
    text.includes("ignore") &&
    (text.includes("agent") ||
      text.includes("memory") ||
      text.includes("prompt"))
  ) {
    return {
      agent: "Security Guard",
      reply: "I cannot bypass FinAssist safety rules.",
    };
  }

  const updates = extractUpdates(raw);

  if (hasAnyUpdate(updates)) {
    const changes = [];

    if (updates.income !== null && memory.income !== updates.income) {
      changes.push(
        `income from ${rupees(memory.income || 0)} to ${rupees(
          updates.income
        )}`
      );
    }

    if (updates.expenses !== null && memory.expenses !== updates.expenses) {
      changes.push(
        `expenses from ${rupees(memory.expenses || 0)} to ${rupees(
          updates.expenses
        )}`
      );
    }

    if (updates.emi !== null && memory.emi !== updates.emi) {
      changes.push(
        `EMI from ${rupees(memory.emi || 0)} to ${rupees(updates.emi)}`
      );
    }

    if (
      updates.targetAmount !== null &&
      memory.targetAmount !== updates.targetAmount
    ) {
      changes.push(`goal amount to ${rupees(updates.targetAmount)}`);
    }

    if (updates.goal && memory.goal !== updates.goal) {
      changes.push(`goal to ${updates.goal}`);
    }

    if (changes.length === 0) {
      return {
        agent: "Memory Agent",
        reply: "This already matches your memory profile.",
      };
    }

    pendingMemoryUpdate = updates;

    return {
      agent: "Memory Agent",
      reply: makeVoiceSafe(
        `I heard ${changes.join(
          " and "
        )}. Should I update your profile? Please say yes or no.`
      ),
    };
  }

  return await finAssistVoiceBrain(raw);
}