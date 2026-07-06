import { useState } from "react";

function ChatInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    onSend(message.trim());
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 border-t border-slate-800 bg-slate-950 p-4"
    >
      <input
        type="text"
        value={message}
        placeholder="Ask FinAssist AI..."
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white disabled:opacity-50"
      >
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
}

export default ChatInput;