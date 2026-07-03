import { finAssistBrain } from "../agents/finAssistBrain.js";
import { redactSensitiveData } from "../services/privacyRedactor.js";
import { shortReply } from "../services/shortReply.js";

import {
  saveMessage,
  getMemory,
  clearMemory,
} from "../memory/conversationMemory.js";

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

    const result = await finAssistBrain(safeMessage);
    result.reply = shortReply(result.reply);

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
    console.error("Chat Controller Error:", error.message);

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