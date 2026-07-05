// backend/src/controllers/chatController.js

let chatHistory = [];

function fallbackFinanceReply(message) {
  const text = message.toLowerCase();

  if (text.includes("credit card")) {
    return {
      agent: "Credit Card Advisor",
      reply:
        "Yes, I can help with credit cards. To check eligibility, I need income, existing EMI, credit score if available, and your main purpose like cashback, travel, fuel, or shopping. Good rule: pay full bill on time and keep usage below 30% of limit.",
    };
  }

  if (text.includes("saving") || text.includes("savings account")) {
    return {
      agent: "Savings Account Advisor",
      reply:
        "A savings account is useful for salary, emergency fund, daily banking, UPI, debit card, and statements. Keep 1–2 months expenses in savings and move extra money to FD, RD, SIP, or goal-based investments.",
    };
  }

  if (text.includes("loan") || text.includes("emi")) {
    return {
      agent: "Loan Advisor",
      reply:
        "For any loan, EMI should be affordable. Safe rule: total EMI should usually stay below 35–40% of monthly income. Tell me loan amount, interest rate, and tenure, I’ll calculate EMI and safety.",
    };
  }

  if (
    text.includes("invest") ||
    text.includes("sip") ||
    text.includes("mutual fund")
  ) {
    return {
      agent: "Investment Advisor",
      reply:
        "Start investments step by step: emergency fund first, then health insurance, then SIP or mutual funds for long-term goals. Tell me your monthly saving amount and risk level: low, moderate, or high.",
    };
  }

  if (text.includes("upi")) {
    return {
      agent: "Digital Banking Advisor",
      reply:
        "For UPI issues, first check if money was deducted. If deducted but not received, wait for bank reversal timeline, save transaction ID, and raise a complaint with your bank or UPI app.",
    };
  }

  return {
    agent: "FinAssist AI",
    reply:
      "I can help with savings accounts, current accounts, debit cards, credit cards, loans, EMI, investments, insurance, tax, budgeting, UPI, fraud safety, and financial planning. Tell me your financial question.",
  };
}

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        reply: "Please enter a valid message.",
      });
    }

    let result;

    try {
      const brainModule = await import("../agents/finAssistBrain.js");
      result = await brainModule.finAssistBrain(message);
    } catch (brainError) {
      console.log("FinAssistBrain fallback used:", brainError.message);
      result = fallbackFinanceReply(message);
    }

    if (!result || !result.reply) {
      result = fallbackFinanceReply(message);
    }

    chatHistory.push({
      role: "user",
      message,
      time: new Date().toISOString(),
    });

    chatHistory.push({
      role: "assistant",
      agent: result.agent || "FinAssist AI",
      message: result.reply,
      time: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      agent: result.agent || "FinAssist AI",
      reply: result.reply,
      data: result.data || null,
    });
  } catch (error) {
    console.error("Chat Controller Error:", error);

    return res.status(200).json({
      success: true,
      agent: "FinAssist AI",
      reply:
        "I’m here to help with your financial question. Ask me about savings, credit cards, debit cards, loans, EMI, investments, insurance, tax, budgeting, UPI, or fraud safety.",
      data: null,
    });
  }
};

export const getHistory = (req, res) => {
  return res.status(200).json({
    success: true,
    history: chatHistory,
  });
};

export const clearHistory = (req, res) => {
  chatHistory = [];

  return res.status(200).json({
    success: true,
    message: "Chat history cleared successfully.",
  });
};