{[
  "My name is Rahul. My income is 75000. My expenses are 25000. EMI is 15000. I want to save 1000000 for a house.",
  "How much can I save monthly?",
  "How long will it take to reach my goal?",
  "What is my financial health score?",
  "Give me a complete financial plan",
  "Run LangGraph advanced plan",
].map((prompt) => (
  <button
    key={prompt}
    onClick={() => setMessage(prompt)}
    className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-left text-slate-200 hover:border-cyan-500 hover:bg-slate-800"
  >
    {prompt}
  </button>
))}