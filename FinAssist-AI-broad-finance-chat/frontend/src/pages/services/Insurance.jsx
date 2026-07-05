import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
function Insurance() {
  const navigate = useNavigate();
  const [income, setIncome] = useState("");
  const [cover, setCover] = useState("");

  const recommendedLifeCover = Number(income) * 10;
  const gap = Math.max(recommendedLifeCover - Number(cover), 0);

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
         <Sidebar />
      <button onClick={() => navigate("/dashboard")} className="mb-6 rounded-lg bg-slate-800 px-4 py-2">← Back</button>
      <h1 className="text-4xl font-bold text-cyan-400">Insurance Agent</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 space-y-4">
          <input type="number" placeholder="Annual Income" value={income} onChange={(e) => setIncome(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
          <input type="number" placeholder="Existing Life Cover" value={cover} onChange={(e) => setCover(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400">Recommended Cover</p>
          <h2 className="text-3xl font-bold text-cyan-400">₹{recommendedLifeCover}</h2>
          <p className="mt-5 text-slate-400">Coverage Gap</p>
          <h2 className="text-3xl font-bold text-red-400">₹{gap}</h2>
        </div>
      </div>
    </div>
  );
}

export default Insurance;