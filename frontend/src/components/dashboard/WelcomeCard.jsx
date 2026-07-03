import { MessageSquare, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function WelcomeCard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <section className="rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-blue-700 p-9 text-white shadow-xl">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
            AI Banking Dashboard
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Welcome back, {user.name || "User"}
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Manage your savings, credit cards, loans, investments, insurance and
            financial planning from one intelligent assistant.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/chat")}
            className="rounded-xl bg-white px-6 py-3 font-bold text-blue-700 hover:bg-blue-50"
          >
            <MessageSquare className="mr-2 inline" size={20} />
            Ask AI
          </button>

          <button
            onClick={() => alert("Reports coming soon")}
            className="rounded-xl border border-blue-200 px-6 py-3 font-bold text-white hover:bg-white/10"
          >
            <BarChart3 className="mr-2 inline" size={20} />
            Reports
          </button>
        </div>
      </div>
    </section>
  );
}

export default WelcomeCard;