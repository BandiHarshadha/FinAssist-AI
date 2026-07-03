import Sidebar from "../components/dashboard/Sidebar";
import WelcomeCard from "../components/dashboard/WelcomeCard";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <WelcomeCard />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="card p-6">
            <p className="text-sm font-semibold text-slate-500">Monthly Savings</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">₹1,60,000</h2>
            <p className="mt-2 text-sm text-emerald-600">Healthy savings rate</p>
          </div>

          <div className="card p-6">
            <p className="text-sm font-semibold text-slate-500">Financial Health</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">82/100</h2>
            <p className="mt-2 text-sm text-blue-600">Strong profile</p>
          </div>

          <div className="card p-6">
            <p className="text-sm font-semibold text-slate-500">AI Risk Level</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Moderate</h2>
            <p className="mt-2 text-sm text-amber-600">Balanced planning needed</p>
          </div>
        </div>

        <div className="mt-8 card p-7">
          <h2 className="text-2xl font-bold text-slate-900">
            AI Financial Advisor
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Your FinAssist AI agent can analyze savings, loans, investments,
            credit cards, insurance and goals to create a personalized financial plan.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;