import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
function FinancialPlanning() {
  const navigate = useNavigate();
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [emi, setEmi] = useState("");

  const savings = Number(income) - Number(expenses) - Number(emi);
  const savingsRate = income > 0 ? Math.round((savings / Number(income)) * 100) : 0;
  const emiLoad = income > 0 ? Math.round((Number(emi) / Number(income)) * 100) : 0;

  const score = Math.max(
    0,
    Math.min(100, 50 + savingsRate - emiLoad)
  );

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
         <Sidebar />
      <button onClick={() => navigate("/dashboard")} className="mb-6 rounded-lg bg-slate-800 px-4 py-2">← Back</button>
      <h1 className="text-4xl font-bold text-cyan-400">AI Financial Planning Agent</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 space-y-4">
          <input type="number" placeholder="Monthly Income" value={income} onChange={(e) => setIncome(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
          <input type="number" placeholder="Monthly Expenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
          <input type="number" placeholder="Monthly EMI" value={emi} onChange={(e) => setEmi(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400">Monthly Savings</p>
          <h2 className="text-3xl font-bold text-emerald-400">₹{savings}</h2>

          <p className="mt-5 text-slate-400">Savings Rate</p>
          <h2 className="text-3xl font-bold text-cyan-400">{savingsRate}%</h2>

          <p className="mt-5 text-slate-400">Financial Health Score</p>
          <h2 className="text-3xl font-bold text-purple-400">{score}/100</h2>

          <p className="mt-5 text-slate-300">
            {score >= 70
              ? "AI Suggestion: Strong financial health. Start long-term investing."
              : "AI Suggestion: Reduce expenses/EMI and build emergency fund first."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FinancialPlanning;