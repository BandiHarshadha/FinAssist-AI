function formatRupees(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function AiCfpCard({ data }) {
  if (!data) return null;

  const riskClass =
    data.riskColor === "red"
      ? "text-red-400"
      : data.riskColor === "orange"
      ? "text-yellow-400"
      : "text-emerald-400";

  const downloadReport = () => {
    const report = `
FINASSIST FINANCIAL PLANNING REPORT

Income: ${formatRupees(data.income)}
Expenses: ${formatRupees(data.expenses)}
EMI: ${formatRupees(data.emi)}
Monthly Savings: ${formatRupees(data.monthlySavings)}
Savings Rate: ${data.savingsRate}%
EMI Load: ${data.emiLoad}%

Health Score: ${data.healthScore}/100
Grade: ${data.grade}
Risk: ${data.risk}

Goal: ${data.goal}
Target Amount: ${formatRupees(data.targetAmount)}
Goal Timeline: ${data.goalTimeline}
Emergency Fund Needed: ${formatRupees(data.emergencyFundTarget)}

Recommendations:
${data.recommendations?.map((item) => `- ${item}`).join("\n")}

Next Steps:
${data.nextActions?.map((item) => `- ${item}`).join("\n")}
`;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "financial-planning-report.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-slate-950 p-5 text-white shadow-xl">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-emerald-400">
            📊 Financial Planning Report
          </h2>
          <p className="text-sm text-slate-400">
            Personal money health, goal timeline, and next steps.
          </p>
        </div>

        <button
          onClick={downloadReport}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-700"
        >
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-900 p-3">
          <p className="text-slate-400">Income</p>
          <h3 className="text-lg font-bold">{formatRupees(data.income)}</h3>
        </div>

        <div className="rounded-xl bg-slate-900 p-3">
          <p className="text-slate-400">Expenses</p>
          <h3 className="text-lg font-bold">{formatRupees(data.expenses)}</h3>
        </div>

        <div className="rounded-xl bg-slate-900 p-3">
          <p className="text-slate-400">EMI</p>
          <h3 className="text-lg font-bold">{formatRupees(data.emi)}</h3>
        </div>

        <div className="rounded-xl bg-slate-900 p-3">
          <p className="text-slate-400">Monthly Savings</p>
          <h3 className="text-lg font-bold">
            {formatRupees(data.monthlySavings)}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-900 p-3">
          <p className="text-slate-400">Savings Rate</p>
          <h3 className="text-lg font-bold">{data.savingsRate}%</h3>
        </div>

        <div className="rounded-xl bg-slate-900 p-3">
          <p className="text-slate-400">EMI Load</p>
          <h3 className="text-lg font-bold">{data.emiLoad}%</h3>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-slate-900 p-4">
        <h3 className="font-bold text-emerald-400">Financial Health</h3>

        <div className="mt-3 h-3 w-full rounded-full bg-slate-800">
          <div
            className="h-3 rounded-full bg-emerald-500"
            style={{ width: `${data.healthScore || 0}%` }}
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <p>
            Score: <b>{data.healthScore}/100</b>
          </p>
          <p>
            Grade: <b>{data.grade}</b>
          </p>
          <p>
            Risk: <b className={riskClass}>{data.risk}</b>
          </p>
          <p>
            Timeline: <b>{data.goalTimeline}</b>
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-slate-900 p-4 text-sm">
        <h3 className="font-bold text-blue-300">Goal Planning</h3>
        <p className="mt-2">
          Goal: <b>{data.goal}</b>
        </p>
        <p>
          Target: <b>{formatRupees(data.targetAmount)}</b>
        </p>
        <p>
          Emergency Fund Needed:{" "}
          <b>{formatRupees(data.emergencyFundTarget)}</b>
        </p>
      </div>

      <div className="mt-5">
        <h3 className="font-bold text-emerald-400">Recommendations</h3>
        <ul className="ml-6 mt-2 list-disc space-y-1 text-sm">
          {data.recommendations?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <h3 className="font-bold text-yellow-400">Next Steps</h3>
        <ul className="ml-6 mt-2 list-disc space-y-1 text-sm">
          {data.nextActions?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AiCfpCard;