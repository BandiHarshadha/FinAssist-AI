import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const sendMessage = async (message) => {
  try {
    const response = await API.post("/chat", {
      message,
    });

    return response.data;
  } catch (error) {
    console.error("Chat API Error:", error);
    throw error;
  }
};

export default API;