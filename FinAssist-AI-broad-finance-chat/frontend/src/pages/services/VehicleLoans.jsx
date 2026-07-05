import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
function VehicleLoans() {
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const loan = Math.max(Number(price) - Number(downPayment), 0);
  const r = Number(rate) / 12 / 100;
  const n = Number(years) * 12;
  const emi = loan && r && n ? Math.round((loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) : 0;

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
         <Sidebar />
      <button onClick={() => navigate("/dashboard")} className="mb-6 rounded-lg bg-slate-800 px-4 py-2">← Back</button>
      <h1 className="text-4xl font-bold text-cyan-400">Vehicle Loan Agent</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 space-y-4">
          <input type="number" placeholder="Vehicle Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
          <input type="number" placeholder="Down Payment" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
          <input type="number" placeholder="Interest Rate %" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
          <input type="number" placeholder="Tenure in Years" value={years} onChange={(e) => setYears(e.target.value)} className="w-full rounded-xl bg-slate-800 p-3" />
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400">Loan Amount</p>
          <h2 className="text-3xl font-bold text-blue-400">₹{loan}</h2>
          <p className="mt-5 text-slate-400">Estimated EMI</p>
          <h2 className="text-3xl font-bold text-emerald-400">₹{emi}</h2>
        </div>
      </div>
    </div>
  );
}

export default VehicleLoans;