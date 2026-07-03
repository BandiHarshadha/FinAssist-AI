function Features() {
  return (
    <section className="px-6 py-20 bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold text-white">
          Why FinAssist AI?
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
            <h3 className="text-xl font-bold text-cyan-400">
              Financial Digital Twin
            </h3>
            <p className="mt-3 text-slate-400">
              Understand income, expenses, EMI, savings and goals.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
            <h3 className="text-xl font-bold text-cyan-400">
              AI CFP Advisor
            </h3>
            <p className="mt-3 text-slate-400">
              Get personalized planning insights for savings and investments.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
            <h3 className="text-xl font-bold text-cyan-400">
              Privacy Layer
            </h3>
            <p className="mt-3 text-slate-400">
              Sensitive financial details are handled carefully before AI use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;