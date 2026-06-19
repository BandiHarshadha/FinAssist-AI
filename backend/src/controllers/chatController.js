import { financialWorkflow } from "../workflows/financialWorkflow.js";
import { getMemory, clearMemory } from "../memory/conversationMemory.js";
import { writeAuditLog } from "../services/auditService.js";

export const chat = async (req, res) => {
  const traceId = `trace_${Date.now()}`;

  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        output: "Message is required",
        trace_id: traceId,
        finish_reason: "error",
        cost_usd: 0,
      });
    }

    const result = await financialWorkflow(message);

    writeAuditLog({
      timestamp: new Date().toISOString(),
      trace_id: traceId,
      userMessage: message,
      intent: result.intent,
      agent: result.agent,
      tool: result.tool,
      privacy: result.privacy,
      finish_reason: "completed",
    });

    return res.json({
      ...result,

      output: result.reply,
      trace_id: traceId,
      finish_reason: "completed",
      cost_usd: 0.01,
    });
  } catch (error) {
    console.log(error);

    writeAuditLog({
      timestamp: new Date().toISOString(),
      trace_id: traceId,
      error: error.message,
      finish_reason: "error",
    });

    return res.status(500).json({
      success: false,
      output: "Internal Server Error",
      trace_id: traceId,
      finish_reason: "error",
      cost_usd: 0,
    });
  }
};

export const getChatMemory = (req, res) => {
  const traceId = `trace_${Date.now()}`;

  res.json({
    success: true,
    memory: getMemory(),
    output: "Memory fetched successfully",
    trace_id: traceId,
    finish_reason: "completed",
    cost_usd: 0,
  });
};

export const resetChatMemory = (req, res) => {
  const traceId = `trace_${Date.now()}`;

  clearMemory();

  res.json({
    success: true,
    message: "Memory cleared",
    output: "Memory cleared",
    trace_id: traceId,
    finish_reason: "completed",
    cost_usd: 0,
  });
};