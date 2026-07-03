function DigitalTwinCard({ data }) {
  return (
    <div className="mt-5 overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-slate-50 shadow-lg">
      <div className="bg-gradient-to-r from-blue-950 to-blue-700 p-5 text-white">
        <h3 className="text-xl font-extrabold">Virtual Financial Digital Twin</h3>
        <p className="mt-1 text-sm text-blue-100">
          Your AI money avatar based on income, expenses, EMI and savings.
        </p>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-3">
        <Info title="Monthly Income" value={`₹${data.income}`} color="text-slate-900" />
        <Info title="Expenses" value={`₹${data.expenses}`} color="text-red-600" />
        <Info title="Monthly Savings" value={`₹${data.savings}`} color="text-emerald-600" />
        <Info title="EMI Load" value={`${data.emiLoad}%`} color="text-blue-700" />
        <Info title="Health Score" value={`${data.healthScore}/100`} color="text-purple-700" />
        <Info title="Risk Level" value={data.risk} color="text-amber-600" />
      </div>

      <div className="border-t border-blue-100 bg-white p-5">
        <h4 className="font-bold text-slate-900">AI Twin Insight</h4>
        <p className="mt-2 text-sm text-slate-600">
          Your digital twin helps predict affordability, savings stability,
          EMI risk, goal readiness and future financial behavior.
        </p>
      </div>
    </div>
  );
}

function Info({ title, value, color }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h4 className={`mt-2 text-2xl font-bold ${color}`}>{value}</h4>
    </div>
  );
}

export default DigitalTwinCard;