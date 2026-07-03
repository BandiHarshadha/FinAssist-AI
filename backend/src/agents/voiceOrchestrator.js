import { finAssistBrain } from "./finAssistBrain.js";

export async function voiceOrchestrator(transcript) {
  try {
    if (!transcript || typeof transcript !== "string") {
      return {
        agent: "Voice Orchestrator",
        reply: "Please speak or type your financial question.",
        data: null,
      };
    }

    const result = await finAssistBrain(transcript);

    if (!result || !result.reply) {
      return {
        agent: "FinAssist AI",
        reply: "I understood. Please ask your financial question again clearly.",
        data: null,
      };
    }

    return {
      agent: result.agent || "FinAssist Voice AI",
      reply: result.reply,
      data: result.data || null,
    };
  } catch (error) {
    console.error("Voice Orchestrator Error:", error.message);

    return {
      agent: "Voice Orchestrator",
      reply: "Sorry, I could not process that. Please try again.",
      data: null,
    };
  }
}