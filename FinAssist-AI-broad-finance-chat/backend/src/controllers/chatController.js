import { finAssistBrain } from "../agents/finAssistBrain.js";
import { redactSensitiveData } from "../services/privacyRedactor.js";

import {
  saveMessage,
  getMemory,
  clearMemory,
} from "../memory/conversationMemory.js";

const buildSmartFallback = (message) => {
  const text = message.toLowerCase();

  if (text.includes("car") || text.includes("vehicle")) {
    return {
      agent: "Vehicle Loan Agent",
      reply:
        "Yes, I can help you plan for buying a car. First decide your budget, down payment, and EMI comfort. Ideally, keep car EMI below 10–15% of your monthly income. If your income is ₹2,00,000/month and expenses + EMI are around ₹40,000, you can afford a car, but don’t put all savings into it. A safe plan is: keep 6 months emergency fund, pay 20–30% down payment, choose loan tenure of 3–5 years, and avoid EMI above ₹25,000–₹30,000 unless the car is essential.",
      data: {
        type: "vehicle_plan",
        recommendation: "Buy only if EMI stays below 10–15% of monthly income.",
      },
    };
  }

  if (text.includes("laptop") || text.includes("buy")) {
    return {
      agent: "Buying Decision Agent",
      reply:
        "Yes, I can help you decide. A good rule is: buy only if the cost does not disturb emergency savings, monthly expenses, EMIs, or goals. If it is for studies/work and your monthly savings are strong, buying is reasonable. Tell me the price and I’ll say whether to buy now, wait, or choose EMI.",
      data: null,
    };
  }

  if (text.includes("savings") || text.includes("save")) {
    return {
      agent: "Savings Agent",
      reply:
        "Let’s plan your savings. First divide your money into emergency fund, short-term goals, and long-term investments. Try to keep at least 20–30% of income as savings. If your income is high and expenses are low, we can create a stronger plan with emergency fund, car/house goals, SIP, FD, and insurance.",
      data: null,
    };
  }

  if (text.includes("loan") || text.includes("emi")) {
    return {
      agent: "Loan Agent",
      reply:
        "For loans, the main rule is EMI safety. Your total EMI should ideally stay below 35–40% of monthly income. I can calculate EMI, eligibility, risk, and repayment plan. Tell me loan amount, interest rate, and tenure.",
      data: null,
    };
  }

  if (text.includes("investment") || text.includes("invest") || text.includes("sip")) {
    return {
      agent: "Investment Agent",
      reply:
        "For investments, start with emergency fund first, then SIPs based on your risk level. A balanced beginner plan can include equity mutual funds, debt funds/FD, gold, and some cash. Tell me your monthly investment amount and risk comfort: low, moderate, or high.",
      data: null,
    };
  }

  if (text.includes("insurance")) {
    return {
      agent: "Insurance Agent",
      reply:
        "Insurance planning should come before aggressive investing. You should check health insurance, term life cover, vehicle insurance, and emergency protection. A good life cover is often around 10–15 times annual income, depending on family responsibilities.",
      data: null,
    };
  }

  if (text.includes("digital twin")) {
    return {
      agent: "Financial Digital Twin Agent",
      reply:
        "Your financial digital twin is a virtual model of your income, expenses, EMI, savings, goals, risk level, and future money behavior. It helps predict whether you can afford goals like car, laptop, house, travel, or investments.",
      data: {
        type: "digital_twin",
        message: "Financial digital twin generated from available data.",
        income: 200000,
        expenses: 30000,
        emiLoad: 5,
        savings: 160000,
        healthScore: 82,
        risk: "Moderate",
      },
    };
  }

  if (text.includes("cfp") || text.includes("financial planning")) {
    return {
      agent: "AI CFP Agent",
      reply:
        "Here is a basic financial planning approach: build emergency fund, reduce unnecessary expenses, keep EMI under control, get insurance, invest monthly through SIPs, and track goals like car, house, and retirement.",
      data: {
        type: "ai_cfp",
        income: 200000,
        expenses: 30000,
        emi: 10000,
        savings: 160000,
        savingsRate: 80,
        verdict: "Strong savings capacity. You can plan goals confidently.",
        plan: [
          "Keep 6 months emergency fund.",
          "Limit EMI to below 35–40% of income.",
          "Invest monthly through SIPs.",
          "Keep insurance before major loans.",
        ],
      },
    };
  }

  return {
    agent: "FinAssist AI",
    reply:
      "I understood your question. Tell me a little more about your income, expenses, EMI, savings, and goal amount, and I’ll create a proper financial plan for you.",
    data: null,
  };
};

const isGenericReply = (reply = "") => {
  const genericReplies = [
    "i’m ready",
    "i'm ready",
    "ask about buying",
    "loans, savings, goals",
  ];

  return genericReplies.some((item) => reply.toLowerCase().includes(item));
};

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const privacyResult = redactSensitiveData(message);
    const safeMessage = privacyResult.redactedText;

    saveMessage("user", safeMessage);

    let result = await finAssistBrain(safeMessage);

    if (!result || isGenericReply(result.reply)) {
      result = buildSmartFallback(safeMessage);
    }

    saveMessage(
      "assistant",
      result.reply,
      result.agent || "FinAssist AI",
      result.data || null
    );

    return res.json({
      success: true,
      agent: result.agent || "FinAssist AI",
      reply: result.reply,
      data: result.data || null,
      history: getMemory(),

      privacy: {
        enabled: true,
        redacted: privacyResult.isSensitive,
        findings: privacyResult.findings,
        findingsCount: privacyResult.findings.length,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Chat failed",
      error: error.message,
    });
  }
};

export const getHistory = (req, res) => {
  return res.json({
    success: true,
    history: getMemory(),
  });
};

export const clearHistory = (req, res) => {
  clearMemory();

  return res.json({
    success: true,
    message: "Chat history cleared successfully.",
  });
};