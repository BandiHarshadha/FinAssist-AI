import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

function ChatArea() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello Harshadha 👋 I'm FinAssist AI. How can I help you today?"
    }
  ]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      sender: "user",
      text
    };

    const aiMessage = {
      sender: "ai",
      text: "I'm processing your request..."
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
  };

  return (
    <main className="flex flex-1 flex-col bg-slate-950">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} />
    </main>
  );
}

export default ChatArea;