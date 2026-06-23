import { finAssistBrain } from "../agents/finAssistBrain.js";
import {
  getMemory,
  resetMemory
} from "../memory/userProfileMemory.js";

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    const result = await finAssistBrain(message);

    res.json({
      success: true,
      agent: result.agent,
      reply: result.reply
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Chat failed",
      error: error.message
    });
  }
};

export const getChatMemory = (req, res) => {
  try {
    const memory = getMemory();

    res.json({
      success: true,
      memory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get memory",
      error: error.message
    });
  }
};

export const resetChatMemory = (req, res) => {
  try {
    resetMemory();

    res.json({
      success: true,
      message: "Memory reset successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reset memory",
      error: error.message
    });
  }
};