import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  LogOut,
  PiggyBank,
  CreditCard,
  Home,
  Car,
  TrendingUp,
  Landmark,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-72 min-h-screen bg-slate-950 px-5 py-6 text-white">
      <div className="mb-8">
        <h1
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer text-3xl font-extrabold text-white"
        >
          FinAssist
        </h1>
        <p className="mt-1 text-sm text-slate-400">AI Banking Agent</p>
      </div>

      <nav className="space-y-2">
        <button onClick={() => navigate("/dashboard")} className="sidebar-btn">
          <LayoutDashboard size={19} />
          Dashboard
        </button>

        <button onClick={() => navigate("/chat")} className="sidebar-btn">
          <MessageSquare size={19} />
          AI Chat
        </button>

        <p className="px-3 pt-5 text-xs font-bold uppercase tracking-widest text-slate-500">
          Banking Services
        </p>

        <button onClick={() => navigate("/services/savings")} className="sidebar-btn">
          <PiggyBank size={19} />
          Savings
        </button>

        <button onClick={() => navigate("/services/credit-cards")} className="sidebar-btn">
          <CreditCard size={19} />
          Credit Cards
        </button>

        <button onClick={() => navigate("/services/home-loans")} className="sidebar-btn">
          <Home size={19} />
          Home Loans
        </button>

        <button onClick={() => navigate("/services/vehicle-loans")} className="sidebar-btn">
          <Car size={19} />
          Vehicle Loans
        </button>

        <button onClick={() => navigate("/services/investments")} className="sidebar-btn">
          <TrendingUp size={19} />
          Investments
        </button>

        <button onClick={() => navigate("/services/fixed-deposits")} className="sidebar-btn">
          <Landmark size={19} />
          Fixed Deposits
        </button>

        <button onClick={() => navigate("/services/insurance")} className="sidebar-btn">
          <ShieldCheck size={19} />
          Insurance
        </button>

        <button onClick={() => navigate("/services/financial-planning")} className="sidebar-btn">
          <CalendarCheck size={19} />
          Financial Planning
        </button>

        <p className="px-3 pt-5 text-xs font-bold uppercase tracking-widest text-slate-500">
          Account
        </p>

        <button onClick={() => navigate("/settings")} className="sidebar-btn">
          <Settings size={19} />
          Settings
        </button>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/10"
        >
          <LogOut size={19} />
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;