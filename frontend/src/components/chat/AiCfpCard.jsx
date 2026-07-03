function AiCfpCard({ data }) {
  return (
    <div className="mt-5 overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-lg">
      <div className="bg-gradient-to-r from-emerald-700 to-teal-600 p-5 text-white">
        <h3 className="text-xl font-extrabold">AI CFP Financial Planning Report</h3>
        <p className="mt-1 text-sm text-emerald-50">{data.verdict}</p>
      </div>

      <table className="w-full text-sm">
        <tbody>
          <Row label="Monthly Income" value={`₹${data.income}`} />
          <Row label="Monthly Expenses" value={`₹${data.expenses}`} color="text-red-600" />
          <Row label="Monthly EMI" value={`₹${data.emi}`} color="text-blue-700" />
          <Row label="Monthly Savings" value={`₹${data.savings}`} color="text-emerald-600" />
          <Row label="Savings Rate" value={`${data.savingsRate}%`} color="text-purple-700" />
        </tbody>
      </table>

      <div className="border-t border-slate-200 p-5">
        <h4 className="mb-3 font-bold text-slate-900">Recommended Action Plan</h4>

        <div className="space-y-3">
          {data.plan?.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700"
            >
              <span className="font-bold text-emerald-700">{index + 1}.</span>{" "}
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, color = "text-slate-900" }) {
  return (
    <tr className="border-b border-slate-200">
      <td className="bg-slate-50 p-4 font-semibold text-slate-600">{label}</td>
      <td className={`p-4 font-bold ${color}`}>{value}</td>
    </tr>
  );
}

export default AiCfpCard;