import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
function CreditCards() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState("");
  const [used, setUsed] = useState("");

  const utilization = limit > 0 ? Math.round((used / limit) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
         <Sidebar />
      <button onClick={() => navigate("/dashboard")} className="mb-6 rounded-lg bg-slate-800 px-4 py-2">← Back</button>
      <h1 className="text-4xl font-bold text-cyan-400">Credit Card Agent</h1>
      <p className="mt-3 text-slate-300">Track card usage, rewards, bills and utilization.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
          <input type="number" placeholder="Credit Limit" value={limit} onChange={(e) => setLimit(e.target.value)} className="mb-4 w-full rounded-xl bg-slate-800 p-3" />
          <input type="number" placeholder="Amount Used" value={used} onChange={(e) => setUsed(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400">Credit Utilization</p>
          <h2 className="mt-2 text-4xl font-bold text-cyan-400">{utilization}%</h2>
          <p className="mt-4 text-slate-300">
            {utilization > 30
              ? "AI Suggestion: Keep utilization below 30% to improve credit health."
              : "AI Suggestion: Good utilization. Maintain timely payments."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreditCards;