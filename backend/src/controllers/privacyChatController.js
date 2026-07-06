import { finAssistBrain } from "../agents/finAssistBrain.js";
import { scanWithUPLAI } from "../services/uplaiPrivacyService.js";
import {
  savePendingPrivacyMessage,
  getPendingPrivacyMessage,
  deletePendingPrivacyMessage,
} from "../services/privacyDecisionStore.js";

const privacyChatHistory = [];

const createPrivacyId = () => {
  return `privacy_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

export const privacyChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        reply: "Please type a message.",
      });
    }

    const cleanMessage = message.trim();

    const privacyScan = await scanWithUPLAI(cleanMessage);

    if (privacyScan.hasSensitiveData) {
      const privacyId = createPrivacyId();

      savePendingPrivacyMessage(privacyId, {
        userId: req.user?.id || null,
        originalMessage: cleanMessage,
        redactedMessage: privacyScan.redactedText,
        findings: privacyScan.findings,
        source: privacyScan.source,
      });

      return res.json({
        success: true,
        requiresPrivacyDecision: true,
        privacyId,
        agent: "UPLAI Privacy Layer",
        reply:
          "Sensitive data detected. Do you want to redact sensitive details before sending this to FinAssist AI?",
        findings: privacyScan.findings,
        redactedPreview: privacyScan.redactedText,
        options: [
          {
            label: "Redact and Send",
            value: "redact",
          },
          {
            label: "Send Directly",
            value: "send_direct",
          },
        ],
      });
    }

    const result = await finAssistBrain(cleanMessage, req.user?.id);

    const chatItem = {
      id: Date.now().toString(),
      userId: req.user?.id || null,
      message: cleanMessage,
      agent: result.agent || "FinAssist AI",
      reply: result.reply,
      data: result.data || {},
      privacy: {
        checked: true,
        sensitive: false,
        source: privacyScan.source,
      },
      createdAt: new Date().toISOString(),
    };

    privacyChatHistory.push(chatItem);

    return res.json({
      success: true,
      agent: chatItem.agent,
      reply: chatItem.reply,
      data: chatItem.data,
      privacy: chatItem.privacy,
      history: chatItem,
    });
  } catch (error) {
    console.error("Privacy Chat Error:", error);

    return res.status(500).json({
      success: false,
      agent: "FinAssist AI",
      reply: "Something went wrong in privacy chat.",
      error: error.message,
    });
  }
};

export const continuePrivacyChat = async (req, res) => {
  try {
    const { privacyId, decision } = req.body;

    if (!privacyId || !decision) {
      return res.status(400).json({
        success: false,
        message: "privacyId and decision are required",
      });
    }

    const pending = getPendingPrivacyMessage(privacyId);

    if (!pending) {
      return res.status(404).json({
        success: false,
        message: "Privacy decision expired or not found",
      });
    }

    const finalMessage =
      decision === "redact" ? pending.redactedMessage : pending.originalMessage;

    const result = await finAssistBrain(finalMessage, req.user?.id);

    const chatItem = {
      id: Date.now().toString(),
      userId: req.user?.id || null,
      message: finalMessage,
      agent: result.agent || "FinAssist AI",
      reply: result.reply,
      data: result.data || {},
      privacy: {
        checked: true,
        sensitive: true,
        decision,
        source: pending.source,
        findings: pending.findings,
      },
      createdAt: new Date().toISOString(),
    };

    privacyChatHistory.push(chatItem);
    deletePendingPrivacyMessage(privacyId);

    return res.json({
      success: true,
      agent: chatItem.agent,
      reply: chatItem.reply,
      data: chatItem.data,
      privacy: chatItem.privacy,
      history: chatItem,
    });
  } catch (error) {
    console.error("Privacy Continue Error:", error);

    return res.status(500).json({
      success: false,
      agent: "FinAssist AI",
      reply: "Something went wrong while continuing privacy chat.",
      error: error.message,
    });
  }
};

export const getPrivacyChatHistory = async (req, res) => {
  try {
    const userId = req.user?.id || null;

    const history = userId
      ? privacyChatHistory.filter((item) => item.userId === userId)
      : privacyChatHistory;

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearPrivacyChatHistory = async (req, res) => {
  try {
    const userId = req.user?.id || null;

    if (!userId) {
      privacyChatHistory.length = 0;
    } else {
      for (let i = privacyChatHistory.length - 1; i >= 0; i--) {
        if (privacyChatHistory[i].userId === userId) {
          privacyChatHistory.splice(i, 1);
        }
      }
    }

    res.json({
      success: true,
      message: "Privacy chat history cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};