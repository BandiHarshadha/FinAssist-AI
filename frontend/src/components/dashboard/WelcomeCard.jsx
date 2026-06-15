import { MessageSquare, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function WelcomeCard() {
  const navigate = useNavigate();

  return (
    <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 p-8 shadow-xl">
      <h1 className="text-4xl font-bold text-white">
        👋 Welcome Back, Harshadha
      </h1>

      <p className="mt-4 text-cyan-100 text-lg">
        Your intelligent banking assistant is online and ready to help you with
        loans, savings, investments, insurance, and much more.
      </p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate("/chat")}
          className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:scale-105"
        >
          <MessageSquare size={20} />
          Start New Chat
        </button>

        <button
          onClick={() => alert("Reports coming soon!")}
          className="flex items-center gap-2 rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-700"
        >
          <BarChart3 size={20} />
          View Reports
        </button>
      </div>
    </div>
  );
}

export default WelcomeCard;