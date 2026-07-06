function formatINR(value) {
  if (typeof value === "string") return value;
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-extrabold text-slate-900">{value}</p>
    </div>
  );
}

function DataTable({ title, rows }) {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
      <div className="bg-slate-100 px-4 py-3 text-sm font-extrabold text-slate-800">
        {title}
      </div>

      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-slate-200">
              <td className="px-4 py-3 font-semibold text-slate-600">
                {row[0]}
              </td>
              <td className="px-4 py-3 text-right font-bold text-slate-900">
                {typeof row[1] === "number" ? formatINR(row[1]) : row[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DigitalTwinCard({ data }) {
  return (
    <div className="mt-4 rounded-3xl border border-blue-200 bg-gradient-to-br from-white to-blue-50 p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-blue-700">
            Virtual Financial Twin
          </p>
          <h2 className="mt-1 text-2xl font-black text-slate-900">
            🧠 {data.title}
          </h2>
        </div>

        <div className="rounded-2xl bg-blue-700 px-5 py-4 text-center text-white">
          <p className="text-xs font-bold uppercase">Score</p>
          <p className="text-3xl font-black">{data.score}/100</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        <MetricCard label="Net Worth" value={formatINR(data.netWorth)} />
        <MetricCard label="Risk Level" value={data.riskLevel} />
        <MetricCard label="Financial Score" value={`${data.score}/100`} />
      </div>

      {data.sections?.map((section, index) => (
        <DataTable key={index} title={section.title} rows={section.rows} />
      ))}

      <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-sm font-extrabold text-emerald-800">Smart Insight</p>
        <p className="mt-2 text-sm leading-relaxed text-emerald-900">
          {data.insight}
        </p>
      </div>
    </div>
  );
}

function AiCfpCard({ data }) {
  return (
    <div className="mt-4 rounded-3xl border border-purple-200 bg-gradient-to-br from-white to-purple-50 p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-purple-700">
            Certified Financial Planner AI
          </p>
          <h2 className="mt-1 text-2xl font-black text-slate-900">
            🧾 {data.title}
          </h2>
        </div>

        <div className="rounded-2xl bg-purple-700 px-5 py-4 text-center text-white">
          <p className="text-xs font-bold uppercase">Health Score</p>
          <p className="text-3xl font-black">{data.score}/100</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        <MetricCard label="Net Worth" value={formatINR(data.netWorth)} />
        <MetricCard label="Risk Level" value={data.riskLevel} />
        <MetricCard label="Score" value={`${data.score}/100`} />
      </div>

      <DataTable title="Executive Summary" rows={data.summary} />

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
        <div className="bg-slate-100 px-4 py-3 text-sm font-extrabold text-slate-800">
          Monthly Budget Plan
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-slate-200 bg-white">
              <th className="px-4 py-3 text-left text-slate-600">Category</th>
              <th className="px-4 py-3 text-right text-slate-600">Current</th>
              <th className="px-4 py-3 text-right text-slate-600">
                Recommended
              </th>
            </tr>
          </thead>
          <tbody>
            {data.budget?.map((row, index) => (
              <tr key={index} className="border-t border-slate-200">
                <td className="px-4 py-3 font-semibold text-slate-600">
                  {row[0]}
                </td>
                <td className="px-4 py-3 text-right font-bold text-slate-900">
                  {formatINR(row[1])}
                </td>
                <td className="px-4 py-3 text-right font-bold text-blue-700">
                  {formatINR(row[2])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DataTable title="Emergency Fund" rows={data.emergencyFund} />
      <DataTable title="Investment Strategy" rows={data.investmentPlan} />

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-extrabold text-slate-800">
          🎯 90-Day Action Plan
        </p>

        <div className="mt-3 space-y-2">
          {data.actionPlan?.map((item, index) => (
            <div
              key={index}
              className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
            >
              ✅ {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-sm font-extrabold text-emerald-800">
          Final CFP Advice
        </p>
        <p className="mt-2 text-sm leading-relaxed text-emerald-900">
          {data.finalAdvice}
        </p>
      </div>
    </div>
  );
}

function PrivacyDecisionCard({ data }) {
  const findingLabels = data.findings?.map((item) => item.type || item.label || "Sensitive Data") || [];

  return (
    <div className="mt-4 overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-white via-amber-50 to-orange-50 shadow-sm">
      <div className="border-b border-amber-200 bg-amber-100/70 px-5 py-4">
        <p className="text-xs font-extrabold uppercase tracking-widest text-amber-700">
          Enterprise Privacy Check
        </p>
        <h2 className="mt-1 text-2xl font-black text-slate-900">
          🛡 Privacy Protection
        </h2>
      </div>

      <div className="p-5">
        <p className="text-sm font-semibold text-slate-700">
          We found sensitive information in your message. Do you want to hide it before FinAssist AI processes your request?
        </p>

        <div className="mt-4 rounded-2xl border border-amber-200 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-wide text-amber-700">
            Detected
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {findingLabels.length ? (
              findingLabels.map((label, index) => (
                <span
                  key={index}
                  className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800"
                >
                  ✓ {label}
                </span>
              ))
            ) : (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800">
                ✓ Sensitive Data
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">
            Safe Preview
          </p>

          <p className="mt-3 whitespace-pre-line rounded-xl bg-slate-50 p-4 text-sm font-semibold leading-relaxed text-slate-800">
            {data.redactedPreview}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("privacy-decision", {
                  detail: {
                    privacyId: data.privacyId,
                    decision: "redact",
                  },
                })
              )
            }
            className="rounded-2xl bg-blue-700 px-5 py-4 text-sm font-black text-white shadow-sm hover:bg-blue-800"
          >
            🔵 Redact & Continue
          </button>

          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("privacy-decision", {
                  detail: {
                    privacyId: data.privacyId,
                    decision: "send_direct",
                  },
                })
              )
            }
            className="rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm font-black text-slate-800 shadow-sm hover:bg-slate-50"
          >
            ⚪ Send Original
          </button>
        </div>

        <p className="mt-4 text-xs font-semibold text-slate-500">
          Your choice controls whether sensitive details are masked before reaching the financial agent.
        </p>
      </div>
    </div>
  );
}

function PrivacyProcessingCard({ data }) {
  return (
    <div className="mt-4 rounded-3xl border border-blue-200 bg-gradient-to-br from-white to-blue-50 p-5 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-widest text-blue-700">
        Secure Processing
      </p>

      <h2 className="mt-1 text-2xl font-black text-slate-900">
        🛡 Protecting your data...
      </h2>

      <div className="mt-5 space-y-3">
        <div className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700">
          ✓ Sensitive details {data.decision === "redact" ? "hidden" : "approved by user"}
        </div>

        <div className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700">
          ✓ Sending safe request to FinAssist AI
        </div>

        <div className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-blue-700">
          🤖 Financial agent is thinking...
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[92%] rounded-2xl px-5 py-4 shadow-sm ${
          isUser
            ? "bg-blue-700 text-white"
            : "border border-slate-200 bg-white text-slate-900"
        }`}
      >
        {!isUser && msg.data?.type !== "privacy_decision" && msg.data?.type !== "privacy_processing" && (
          <p className="mb-2 text-sm font-bold text-blue-700">
            {msg.agent || "FinAssist AI"}
          </p>
        )}

        {msg.data?.type === "privacy_decision" ? (
          <PrivacyDecisionCard data={msg.data} />
        ) : msg.data?.type === "privacy_processing" ? (
          <PrivacyProcessingCard data={msg.data} />
        ) : msg.data?.type === "digital_twin_card" ? (
          <DigitalTwinCard data={msg.data} />
        ) : msg.data?.type === "ai_cfp_card" ? (
          <AiCfpCard data={msg.data} />
        ) : (
          <p className="whitespace-pre-line text-sm leading-relaxed">
            {msg.text}
          </p>
        )}

        {msg.privacy?.checked && (
          <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
            Privacy Layer:{" "}
            {msg.privacy.sensitive
              ? `Sensitive data handled with "${msg.privacy.decision}"`
              : "Checked. No sensitive data detected."}
          </div>
        )}

        <p
          className={`mt-2 text-xs ${
            isUser ? "text-blue-100" : "text-slate-400"
          }`}
        >
          {msg.time}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;