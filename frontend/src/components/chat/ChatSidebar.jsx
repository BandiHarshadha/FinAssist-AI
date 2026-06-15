import { useNavigate } from "react-router-dom";

function ChatSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-900 p-6 overflow-y-auto">
      <h1
        onClick={() => navigate("/dashboard")}
        className="cursor-pointer text-3xl font-bold text-cyan-400"
      >
        🤖 FinAssist AI
      </h1>

      <p className="mt-2 text-sm text-slate-400">
        Multi-Agent Financial Advisor
      </p>

      <button className="mt-8 w-full rounded-xl bg-cyan-500 py-3 font-bold text-white hover:bg-cyan-600">
        + New Chat
      </button>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-3 w-full rounded-xl bg-slate-800 py-3 font-semibold text-white hover:bg-slate-700"
      >
        ← Dashboard
      </button>

      <div className="mt-8 rounded-xl bg-slate-800 p-4">
        <h2 className="font-bold text-white">🧠 Agentic Flow</h2>

        <div className="mt-4 space-y-2 text-sm text-slate-300">
          <p>1. User Query</p>
          <p>↓</p>
          <p>2. Orchestrator Agent</p>
          <p>↓</p>
          <p>3. Specialist Agent</p>
          <p>↓</p>
          <p>4. Tool Calling</p>
          <p>↓</p>
          <p>5. Planner Agent</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-slate-800 p-4">
        <h2 className="font-bold text-white">👥 Agents</h2>

        <div className="mt-4 space-y-2 text-sm text-slate-300">
          <p>🏦 Loan Agent</p>
          <p>📈 Investment Agent</p>
          <p>💳 Banking Agent</p>
          <p>🛡 Insurance Agent</p>
          <p>📊 Budget Agent</p>
          <p>📋 Planner Agent</p>
        </div>
      </div>
    </aside>
  );
}

export default ChatSidebar;