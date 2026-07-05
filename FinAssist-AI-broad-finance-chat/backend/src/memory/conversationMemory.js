const memory = [];
let lastDecisionQuestion = "";

function isOnlyFinancialDetails(text) {
  const lower = text.toLowerCase();
  return (
    /\d/.test(lower) &&
    (lower.includes("income") ||
      lower.includes("salary") ||
      lower.includes("expenses") ||
      lower.includes("expense") ||
      lower.includes("emi"))
  );
}

export const saveMessage = (role, text, agent = null, data = null) => {
  memory.push({
    role,
    text,
    agent,
    data,
    time: new Date().toLocaleString(),
  });

  if (role === "user" && !isOnlyFinancialDetails(text)) {
    lastDecisionQuestion = text;
  }

  if (memory.length > 100) memory.shift();
};

export const getMemory = () => memory;

export const clearMemory = () => {
  memory.length = 0;
  lastDecisionQuestion = "";
};

export const getLastDecisionQuestion = () => lastDecisionQuestion;