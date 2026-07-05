import { voiceOrchestrator } from "../agents/voiceOrchestrator.js";
import { redactSensitiveData } from "../services/privacyRedactor.js";
import { shortReply } from "../services/shortReply.js";

import {
  saveMessage,
  getMemory,
  clearMemory,
} from "../memory/conversationMemory.js";

export const voiceMessage = async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript || typeof transcript !== "string") {
      return res.status(400).json({
        success: false,
        message: "Transcript is required",
      });
    }

    const privacyResult = redactSensitiveData(transcript);
    const safeText = privacyResult.redactedText;

    saveMessage("user", safeText, "You");

    const result = await voiceOrchestrator(safeText);
    result.reply = shortReply(result.reply);

    saveMessage(
      "assistant",
      result.reply,
      result.agent || "FinAssist Voice AI",
      result.data || null
    );

    return res.json({
      success: true,
      agent: result.agent || "FinAssist Voice AI",
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
    console.error("Voice Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Voice orchestration failed",
      error: error.message,
    });
  }
};

export const getVoiceHistory = (req, res) => {
  return res.json({
    success: true,
    history: getMemory(),
  });
};

export const clearVoiceHistory = (req, res) => {
  clearMemory();

  return res.json({
    success: true,
    message: "Voice chat history cleared successfully.",
  });
};