import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">

      <h1
        onClick={() => navigate("/")}
        className="mb-10 cursor-pointer text-2xl font-bold text-cyan-400"
      >
        🤖 FinAssist AI
      </h1>

      <nav className="space-y-4">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-white hover:bg-slate-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/chat")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-white hover:bg-slate-800"
        >
          <MessageSquare size={20} />
          New Chat
        </button>

        <button
          onClick={() => navigate("/settings")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-white hover:bg-slate-800"
        >
          <Settings size={20} />
          Settings
        </button>

        <button
          onClick={() => navigate("/")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 hover:bg-slate-800"
        >
          <LogOut size={20} />
          Logout
        </button>

      </nav>
    </aside>
  );
}

export default Sidebar;