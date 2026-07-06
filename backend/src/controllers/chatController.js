import { finAssistBrain } from "../agents/finAssistBrain.js";

const chatHistory = [];

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        agent: "FinAssist AI",
        reply: "Please type a message.",
      });
    }

    const safeMessage = message.trim();

    console.log("CHAT CONTROLLER USER:", req.user?.id || "No user found");

    const result = await finAssistBrain(safeMessage, req.user?.id);

    const chatItem = {
      id: Date.now().toString(),
      userId: req.user?.id || null,
      message: safeMessage,
      agent: result.agent || "FinAssist AI",
      reply: result.reply || "I could not generate a reply.",
      data: result.data || {},
      createdAt: new Date().toISOString(),
    };

    chatHistory.push(chatItem);

    return res.json({
      success: true,
      agent: chatItem.agent,
      reply: chatItem.reply,
      data: chatItem.data,
      history: chatItem,
    });
  } catch (error) {
    console.error("Chat Controller Error:", error);

    return res.status(500).json({
      success: false,
      agent: "FinAssist AI",
      reply: "Something went wrong while processing your message.",
      error: error.message,
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const userId = req.user?.id || null;

    const history = userId
      ? chatHistory.filter((item) => item.userId === userId)
      : chatHistory;

    return res.json({
      success: true,
      history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearHistory = async (req, res) => {
  try {
    const userId = req.user?.id || null;

    if (!userId) {
      chatHistory.length = 0;
    } else {
      for (let i = chatHistory.length - 1; i >= 0; i--) {
        if (chatHistory[i].userId === userId) {
          chatHistory.splice(i, 1);
        }
      }
    }

    return res.json({
      success: true,
      message: "Chat history cleared",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};