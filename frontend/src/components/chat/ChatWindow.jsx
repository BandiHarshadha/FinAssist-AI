import { useState } from "react";
import { sendMessage } from "../../services/chatService";

function ChatWindow({ setAgentInfo }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const send = async () => {
    if (!message.trim() || isLoading) return;

    const userText = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
      },
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const res = await sendMessage(userText);

      const aiMessage = {
        sender: "ai",
        text: res.reply,
        agent: res.agent || "FinAssist AI",
        intent: res.intent || "GENERAL",
        tool: res.tool || "None",
        privacy: res.privacy || {
          enabled: false,
          risk: "NOT_SCANNED",
          findingsCount: 0,
        },
      };

      setMessages((prev) => [...prev, aiMessage]);

      setAgentInfo({
        agent: res.agent || "FinAssist AI",
        intent: res.intent || "GENERAL",
        tool: res.tool || "None",
        confidence: "98%",
        privacy: res.privacy || {
          enabled: false,
          risk: "NOT_SCANNED",
          findingsCount: 0,
        },
      });
    } catch (error) {
      console.error(error);

      const errorMessage = {
        sender: "ai",
        text: "❌ Unable to connect to backend. Please check if backend is running on port 5001.",
        agent: "System",
        intent: "ERROR",
        tool: "None",
        privacy: {
          enabled: false,
          risk: "ERROR",
          findingsCount: 0,
        },
      };

      setMessages((prev) => [...prev, errorMessage]);

      setAgentInfo({
        agent: "System",
        intent: "ERROR",
        tool: "None",
        confidence: "0%",
        privacy: {
          enabled: false,
          risk: "ERROR",
          findingsCount: 0,
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col bg-slate-950">
      <div className="border-b border-slate-800 bg-slate-900 px-8 py-5">
        <h1 className="text-2xl font-bold text-white">
          🤖 FinAssist AI — Agentic Banking Assistant
        </h1>

        <p className="text-sm text-green-400">
          ● Orchestrator + Specialist Agents + Tools + Memory + UPLAI Privacy
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {messages.length === 0 && (
          <div className="mx-auto mt-20 max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-white">
              Welcome to FinAssist AI 👋
            </h2>

            <p className="mt-4 text-slate-400">
              Ask about loans, banking, investments, insurance, EMI, budgeting,
              or privacy-safe financial planning.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                "I want to buy my first home",
                "Calculate EMI for 20 lakhs at 8.5% for 20 years",
                "My salary is 80000 and expenses are 45000. Can I afford a home loan?",
                "My SSN is 123-45-6789. Calculate EMI for 20 lakhs at 8.5% for 20 years",
              ].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setMessage(prompt)}
                  className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-left text-slate-200 hover:border-cyan-500 hover:bg-slate-800"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className="mb-6">
            {msg.sender === "user" ? (
              <div className="flex justify-end">
                <div className="max-w-2xl rounded-2xl bg-cyan-600 px-5 py-4 text-white">
                  <p className="mb-1 text-sm font-semibold">👤 You</p>
                  <p>{msg.text}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-start">
                <div className="max-w-3xl rounded-2xl border border-slate-700 bg-slate-900 px-6 py-5 text-white">
                  <div className="mb-3 flex flex-wrap gap-3">
                    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-semibold text-cyan-300">
                      🤖 {msg.agent}
                    </span>

                    <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-semibold text-yellow-300">
                      🎯 {msg.intent}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        msg.tool && msg.tool !== "None"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      🛠 {msg.tool || "None"}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        msg.privacy?.enabled
                          ? "bg-pink-500/20 text-pink-300"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      🔒 {msg.privacy?.enabled ? msg.privacy.risk : "UPLAI Off"}
                    </span>
                  </div>

                  <div className="whitespace-pre-wrap leading-7 text-slate-100">
                    {msg.text}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 text-slate-300">
              🤖 FinAssist AI is thinking...
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-800 bg-slate-900 p-5">
        <div className="flex gap-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800 p-4 text-white placeholder:text-slate-400 outline-none focus:border-cyan-500"
            placeholder="Ask FinAssist AI..."
          />

          <button
            onClick={send}
            disabled={isLoading}
            className="rounded-xl bg-cyan-500 px-8 font-semibold text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default ChatWindow;