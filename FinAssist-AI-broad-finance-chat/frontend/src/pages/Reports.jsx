function Reports() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold text-emerald-400 mb-2">
        Financial Reports
      </h1>

      <p className="text-slate-400 mb-6">
        View your saved financial insights and planning reports.
      </p>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h2 className="text-xl font-bold">📊 Financial Planning Report</h2>
          <p className="text-slate-400 mt-2">
            View income, expenses, EMI, savings, health score, and goal timeline.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h2 className="text-xl font-bold">🧠 Digital Twin Report</h2>
          <p className="text-slate-400 mt-2">
            See your financial profile, risk level, savings rate, and EMI load.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h2 className="text-xl font-bold">🛒 Buying Decision Report</h2>
          <p className="text-slate-400 mt-2">
            Check whether your planned purchases are safe or risky.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reports;