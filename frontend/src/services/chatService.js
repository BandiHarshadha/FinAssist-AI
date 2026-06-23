import axios from "axios";

const API_URL = "http://localhost:5001/api/chat";

export const sendMessage = async (message) => {
  try {
    const response = await axios.post(API_URL, {
      message,
    });

    return response.data;
  } catch (error) {
    console.error("Chat API Error:", error);

    throw error;
  }
};

export const getChatMemory = async () => {
  const response = await axios.get(`${API_URL}/memory`);
  return response.data;
};

export const resetChatMemory = async () => {
  const response = await axios.delete(`${API_URL}/memory`);
  return response.data;
};