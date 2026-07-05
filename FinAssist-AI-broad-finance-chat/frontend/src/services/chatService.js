import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

export const sendMessage = async (message) => {
  const response = await axios.post(API_URL, {
    message,
  });

  return response.data;
};

export const getChatMemory = async () => {
  const response = await axios.get(`${API_URL}/memory`);
  return response.data;
};

export const resetChatMemory = async () => {
  const response = await axios.delete(`${API_URL}/memory`);
  return response.data;
};