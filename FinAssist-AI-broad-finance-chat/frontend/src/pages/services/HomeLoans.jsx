import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
function HomeLoans() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const p = Number(amount);
  const r = Number(rate) / 12 / 100;
  const n = Number(years) * 12;
  const emi = p && r && n ? Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) : 0;

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
         <Sidebar />
      <button onClick={() => navigate("/dashboard")} className="mb-6 rounded-lg bg-slate-800 px-4 py-2">← Back</button>
      <h1 className="text-4xl font-bold text-cyan-400">Home Loan Agent</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 space-y-4">
          <input type="number" placeholder="Loan Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
          <input type="number" placeholder="Interest Rate %" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
          <input type="number" placeholder="Tenure in Years" value={years} onChange={(e) => setYears(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400">Estimated EMI</p>
          <h2 className="mt-2 text-4xl font-bold text-emerald-400">₹{emi}</h2>
          <p className="mt-4 text-slate-300">AI Suggestion: Keep total EMI below 40% of monthly income.</p>
        </div>
      </div>
    </div>
  );
}

export default HomeLoans;