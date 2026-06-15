import { financialWorkflow } from "../workflows/financialWorkflow.js";
import {
  getMemory,
  clearMemory,
} from "../memory/conversationMemory.js";

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    const result = await financialWorkflow(message);

    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getChatMemory = (req, res) => {
  res.json({
    success: true,
    memory: getMemory(),
  });
};

export const resetChatMemory = (req, res) => {
  clearMemory();

  res.json({
    success: true,
    message: "Memory cleared",
  });
};