import { useState } from "react";
import { sendMessage } from "../../services/chatService";

function ChatWindow() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");
    setLoading(true);

    try {
      const res = await sendMessage(currentMessage);

      const aiMessage = {
        sender: "ai",
        text: res.reply || "No response",
        agent: res.agent || "FinAssist AI",
        privacy: res.privacy || {
          enabled: false,
          redacted: false,
          findings: [],
        },
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Backend is not running.",
          agent: "System",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950">

      {/* Header */}

      <div className="border-b border-slate-800 bg-slate-900 p-5">
        <h1 className="text-2xl font-bold text-white">
          🤖 FinAssist AI
        </h1>

        <p className="text-green-400 text-sm">
          Privacy First • Multi-Agent • LangGraph
        </p>
      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-6">

        {messages.length === 0 && (
          <div className="text-center mt-20 text-slate-400">

            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome to FinAssist AI 👋
            </h2>

            <p>
              Ask me anything about your finances.
            </p>

          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-5 flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-3xl rounded-xl px-5 py-4 ${
                msg.sender === "user"
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-900 border border-slate-700 text-white"
              }`}
            >
              {msg.sender === "ai" && (
                <div className="mb-2">

                  <span className="text-cyan-400 font-bold">
                    🤖 {msg.agent}
                  </span>

                </div>
              )}

              <div className="whitespace-pre-wrap">
                {msg.text}
              </div>

              {msg.sender === "ai" &&
                msg.privacy &&
                msg.privacy.enabled && (
                  <div className="mt-3 text-xs text-yellow-300">

                    🔒 Privacy Layer Enabled

                    <br />

                    Redacted:
                    {msg.privacy.redacted ? " Yes" : " No"}

                    <br />

                    Findings:
                    {msg.privacy.findings?.length || 0}

                  </div>
                )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-slate-400">
            🤖 FinAssist AI is thinking...
          </div>
        )}

      </div>

      {/* Input */}

      <div className="border-t border-slate-800 bg-slate-900 p-4">

        <div className="flex gap-3">

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Ask FinAssist AI..."
            className="flex-1 rounded-lg bg-slate-800 text-white p-4 outline-none border border-slate-700"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 rounded-lg"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatWindow;