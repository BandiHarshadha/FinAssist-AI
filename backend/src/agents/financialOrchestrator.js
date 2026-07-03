import { getMemory } from "../memory/userProfileMemory.js";

function money(n) {
  return `₹${Math.round(Number(n || 0)).toLocaleString("en-IN")}`;
}

function emiCalc(principal, years, rate = 8.5) {
  if (!principal || !years) return 0;
  const r = rate / 12 / 100;
  const m = years * 12;
  return Math.round((principal * r * Math.pow(1 + r, m)) / (Math.pow(1 + r, m) - 1));
}

function snapshot() {
  const m = getMemory();
  const savings = m.income - m.expenses - m.emi;
  const emiLoad = m.income ? Math.round((m.emi / m.income) * 100) : 0;
  const savingsRate = m.income ? Math.round((savings / m.income) * 100) : 0;
  return { ...m, savings, emiLoad, savingsRate };
}

function intent(message) {
  const l = message.toLowerCase();

  if (l.includes("digital twin") || l.includes("financial twin")) return "DIGITAL_TWIN";
  if (l.includes("cfp") || l.includes("financial plan") || l.includes("financial planning")) return "AI_CFP";
  if (l.includes("home loan") || l.includes("loan") || l.includes("down payment") || l.includes("tenure")) return "LOAN";
  if (l.includes("want to buy house") || l.includes("buy a house") || l.includes("buy house")) return "HOUSE_GOAL";
  if (l.includes("can i buy") || l.includes("should i buy") || l.includes("afford")) return "BUY";
  if (l.includes("my income") || l.includes("income is") || l.includes("expenses") || l.includes("emi")) return "PROFILE_UPDATE";
  if (l.includes("what is my income")) return "ASK_PROFILE";

  return "GENERAL";
}

export async function financialOrchestrator(message) {
  const data = snapshot();
  const type = intent(message);

  if (type === "PROFILE_UPDATE") {
    return {
      agent: "Memory Agent",
      reply: `Saved. Income ${money(data.income)}/month, expenses ${money(data.expenses)}, EMI ${money(data.emi)}. Monthly savings: ${money(data.savings)}.`,
    };
  }

  if (type === "HOUSE_GOAL") {
    return {
      agent: "Goal Planning Agent",
      reply: "House goal noted. Share house price, down payment, loan amount, and tenure to check affordability.",
    };
  }

  if (type === "BUY") {
    if (!data.income || !data.expenses) {
      return {
        agent: "Decision Agent",
        reply: "Share income, expenses, EMI, and item price. Then I’ll say yes or no clearly.",
      };
    }

    if (data.emiLoad > 35) {
      return {
        agent: "Decision Agent",
        reply: `Not recommended now. EMI load is ${data.emiLoad}% and monthly savings are ${money(data.savings)}. Reduce EMI first.`,
      };
    }

    return {
      agent: "Decision Agent",
      reply: `Possible. You save ${money(data.savings)}/month after expenses and EMI. Share the exact price/EMI to confirm safely.`,
    };
  }

  if (type === "LOAN") {
    if (!data.income || !data.loanAmount || !data.tenureYears) {
      return {
        agent: "Loan Planning Agent",
        reply: "Share income, expenses, EMI, loan amount, and tenure. I’ll estimate EMI and risk.",
      };
    }

    const newEmi = emiCalc(data.loanAmount, data.tenureYears, data.interestRate);
    const totalEmi = data.emi + newEmi;
    const totalLoad = Math.round((totalEmi / data.income) * 100);

    if (totalLoad > 50) {
      return {
        agent: "Loan Planning Agent",
        reply: `Not recommended. Estimated new EMI is ${money(newEmi)}, total EMI load becomes ${totalLoad}%. Too risky for your income.`,
      };
    }

    if (totalLoad > 35) {
      return {
        agent: "Loan Planning Agent",
        reply: `Risky. Estimated EMI is ${money(newEmi)}, total EMI load becomes ${totalLoad}%. Increase tenure/down payment.`,
      };
    }

    return {
      agent: "Loan Planning Agent",
      reply: `Looks manageable. Estimated EMI is ${money(newEmi)}, total EMI load ${totalLoad}%. Keep emergency fund ready.`,
    };
  }

  return {
    agent: "FinAssist AI",
    reply: `I’m ready. Ask about buying, loans, savings, goals, AI CFP, or digital twin.`,
  };
}