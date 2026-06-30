import { voiceOrchestrator } from "../agents/voiceOrchestrator.js";
import { redactSensitiveData } from "../services/privacyRedactor.js";

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
    const result = await voiceOrchestrator(privacyResult.redactedText);

    return res.json({
      success: true,
      agent: result.agent,
      reply: result.reply,
      data: result.data || null,
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
      message: "Voice orchestration failed",
      error: error.message,
    });
  }
};