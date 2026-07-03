import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
function Investments() {
  const navigate = useNavigate();
  const [sip, setSip] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const monthlyRate = Number(rate) / 12 / 100;
  const months = Number(years) * 12;
  const futureValue =
    sip && monthlyRate && months
      ? Math.round(Number(sip) * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
      : 0;

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
         <Sidebar />
      <button onClick={() => navigate("/dashboard")} className="mb-6 rounded-lg bg-slate-800 px-4 py-2">← Back</button>
      <h1 className="text-4xl font-bold text-cyan-400">Investment Agent</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 space-y-4">
          <input type="number" placeholder="Monthly SIP" value={sip} onChange={(e) => setSip(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
          <input type="number" placeholder="Expected Return %" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
          <input type="number" placeholder="Years" value={years} onChange={(e) => setYears(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400">Future Value</p>
          <h2 className="mt-2 text-4xl font-bold text-emerald-400">₹{futureValue}</h2>
          <p className="mt-4 text-slate-300">AI Suggestion: Diversify across equity, debt, gold and emergency cash.</p>
        </div>
      </div>
    </div>
  );
}

export default Investments;