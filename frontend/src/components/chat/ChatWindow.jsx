import { useState } from "react";
import ChatInput from "./ChatInput";

function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      agent: "FinAssist AI",
      text: "Hi, I am FinAssist AI. I can answer using your saved Financial Profile and Digital Twin.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    const userMessage = {
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log("FRONTEND TOKEN:", token);

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      const botMessage = {
        sender: "bot",
        agent: data.agent || "FinAssist AI",
        text: data.reply || "I could not generate a reply.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          agent: "FinAssist AI",
          text: "Server error. Please check backend.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-slate-950">
      <div className="border-b border-slate-800 p-5">
        <h2 className="text-xl font-bold text-white">FinAssist AI Chat</h2>
        <p className="text-sm text-slate-400">
          Personalized financial agent powered by your Digital Twin
        </p>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-slate-900 border border-slate-800 text-slate-100"
              }`}
            >
              {msg.sender === "bot" && (
                <p className="mb-2 text-sm font-semibold text-blue-400">
                  {msg.agent}
                </p>
              )}

              <p className="whitespace-pre-line text-sm leading-relaxed">
                {msg.text}
              </p>

              <p className="mt-2 text-xs opacity-60">{msg.time}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-sm text-slate-400">FinAssist AI is thinking...</div>
        )}
      </div>

      <ChatInput onSend={sendMessage} loading={loading} />
    </div>
  );
}

export default ChatWindow;