import { finAssistBrain } from "../agents/finAssistBrain.js";
import { getMemory, resetMemory } from "../memory/userProfileMemory.js";
import { redactSensitiveData } from "../services/privacyRedactor.js";

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

    const result = await finAssistBrain(safeMessage);

    return res.json({
      success: true,
      agent: result.agent,
      reply: result.reply,
      privacy: {
        enabled: true,
        redacted: privacyResult.isSensitive,
        findings: privacyResult.findings,
        findingsCount: privacyResult.findings.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Chat failed",
      error: error.message,
    });
  }
};

export const getChatMemory = (req, res) => {
  try {
    const memory = getMemory();

    return res.json({
      success: true,
      memory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get memory",
      error: error.message,
    });
  }
};

export const resetChatMemory = (req, res) => {
  try {
    resetMemory();

    return res.json({
      success: true,
      message: "Memory reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to reset memory",
      error: error.message,
    });
  }
};