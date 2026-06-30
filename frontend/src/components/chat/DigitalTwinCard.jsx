function DigitalTwinCard({ data }) {
  if (!data) return null;

  return (
    <div className="bg-slate-950 border border-cyan-700 rounded-2xl p-5 mt-4">
      <h3 className="text-xl font-bold text-cyan-300 mb-4">
        Financial Digital Twin
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Income</p>
          <p className="text-lg font-semibold">₹{data.income}</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Expenses</p>
          <p className="text-lg font-semibold">₹{data.expenses}</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <p className="text-slate-400 text-sm">EMI</p>
          <p className="text-lg font-semibold">₹{data.emi}</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Monthly Savings</p>
          <p className="text-lg font-semibold">₹{data.monthlySavings}</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Savings Rate</p>
          <p className="text-lg font-semibold">{data.savingsRate}%</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <p className="text-slate-400 text-sm">EMI Load</p>
          <p className="text-lg font-semibold">{data.emiRate}%</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Health Score</p>
          <p className="text-lg font-semibold">{data.healthScore}/100</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Risk Level</p>
          <p className="text-lg font-semibold capitalize">{data.riskLevel}</p>
        </div>
      </div>
    </div>
  );
}

export default DigitalTwinCard;