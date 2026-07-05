import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
function Savings() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [monthlyIncome, setMonthlyIncome] = useState(user.monthlyIncome || "");
  const [monthlyExpenses, setMonthlyExpenses] = useState(user.monthlyExpenses || "");
  const [emi, setEmi] = useState(user.emi || "");
  const [goalAmount, setGoalAmount] = useState("");
  const [currentSavings, setCurrentSavings] = useState(user.savings || "");

  const income = Number(monthlyIncome) || 0;
  const expenses = Number(monthlyExpenses) || 0;
  const emiAmount = Number(emi) || 0;
  const savings = income - expenses - emiAmount;
  const goal = Number(goalAmount) || 0;
  const saved = Number(currentSavings) || 0;

  const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0;
  const goalProgress = goal > 0 ? Math.min(Math.round((saved / goal) * 100), 100) : 0;
  const monthsToGoal = savings > 0 && goal > saved ? Math.ceil((goal - saved) / savings) : 0;

  const getSuggestion = () => {
    if (income === 0) return "Enter your income to get savings advice.";
    if (savings <= 0) return "Your savings are zero or negative. Reduce expenses or EMI load first.";
    if (savingsRate < 20) return "Try to save at least 20% of your monthly income.";
    if (savingsRate < 40) return "Good savings habit. You can improve by increasing savings slowly.";
    return "Excellent savings rate. You are building strong financial stability.";
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
         <Sidebar />
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 rounded-lg bg-slate-800 px-4 py-2 text-slate-300 hover:bg-slate-700"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold text-cyan-400">Savings Agent</h1>
      <p className="mt-3 text-slate-300">
        Manage savings accounts, emergency fund and goal savings.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-5 text-2xl font-bold">Enter Financial Details</h2>

          <div className="space-y-4">
            <input
              type="number"
              placeholder="Monthly Income"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full rounded-xl bg-slate-800 p-3 outline-none"
            />

            <input
              type="number"
              placeholder="Monthly Expenses"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full rounded-xl bg-slate-800 p-3 outline-none"
            />

            <input
              type="number"
              placeholder="Monthly EMI"
              value={emi}
              onChange={(e) => setEmi(e.target.value)}
              className="w-full rounded-xl bg-slate-800 p-3 outline-none"
            />

            <input
              type="number"
              placeholder="Current Savings"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full rounded-xl bg-slate-800 p-3 outline-none"
            />

            <input
              type="number"
              placeholder="Goal Amount"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              className="w-full rounded-xl bg-slate-800 p-3 outline-none"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-5 text-2xl font-bold">Savings Dashboard</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-slate-400">Monthly Savings</p>
              <h3 className="mt-2 text-2xl font-bold text-emerald-400">
                ₹{savings}
              </h3>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-slate-400">Savings Rate</p>
              <h3 className="mt-2 text-2xl font-bold text-cyan-400">
                {savingsRate}%
              </h3>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-slate-400">Goal Progress</p>
              <h3 className="mt-2 text-2xl font-bold text-blue-400">
                {goalProgress}%
              </h3>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-slate-400">Months to Goal</p>
              <h3 className="mt-2 text-2xl font-bold text-purple-400">
                {monthsToGoal || "N/A"}
              </h3>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-cyan-500/40 bg-cyan-500/10 p-4">
            <h3 className="font-bold text-cyan-300">AI Suggestion</h3>
            <p className="mt-2 text-slate-200">{getSuggestion()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Savings;