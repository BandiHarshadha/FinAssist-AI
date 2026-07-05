import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/financial-profile";

function FinancialProfile() {
  const [activeTab, setActiveTab] = useState("customer");
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const [customer, setCustomer] = useState({
    fullName: "",
    mobile: "",
    monthlyIncome: "",
    annualIncome: "",
    occupation: "",
    employmentType: "",
    city: "",
    state: "",
  });

  const [bankAccount, setBankAccount] = useState({
    bankName: "",
    accountType: "Savings",
    branch: "",
    ifsc: "",
    maskedAccountNumber: "",
    currentBalance: "",
    availableBalance: "",
    interestRate: "",
    status: "Active",
  });

  const [creditCard, setCreditCard] = useState({
    cardName: "",
    bankName: "",
    cardNetwork: "Visa",
    maskedCardNumber: "",
    creditLimit: "",
    usedLimit: "",
    availableLimit: "",
    outstandingAmount: "",
    dueDate: "",
    billingCycle: "",
    rewardPoints: "",
    annualFee: "",
    status: "Active",
  });

  const [loan, setLoan] = useState({
    loanType: "",
    lenderName: "",
    loanAmount: "",
    outstanding: "",
    interestRate: "",
    emi: "",
    remainingEmis: "",
    tenureMonths: "",
    nextDueDate: "",
    status: "Active",
  });

  const [investment, setInvestment] = useState({
    investmentType: "",
    investmentName: "",
    investedAmount: "",
    currentValue: "",
    monthlyContribution: "",
    annualReturn: "",
    status: "Active",
  });

  const [insurance, setInsurance] = useState({
    insuranceType: "",
    insurer: "",
    policyNumber: "",
    coverageAmount: "",
    premium: "",
    renewalDate: "",
    status: "Active",
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/me`, { headers });
      const data = await res.json();
      if (data.success) setProfile(data.data);
    } catch (error) {
      setMessage("Unable to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const submitData = async (endpoint, body, successMsg) => {
    try {
      setMessage("");

      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!data.success) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      setMessage(successMsg);
      fetchProfile();
    } catch (error) {
      setMessage("Server error. Please check backend.");
    }
  };

  const inputClass =
    "w-full rounded-xl bg-slate-950/70 border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const labelClass = "text-sm text-slate-300 mb-2 block";

  const SectionCard = ({ title, children }) => (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-white mb-5">{title}</h2>
      {children}
    </div>
  );

  const Field = ({ label, value, onChange, type = "text", placeholder }) => (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        className={inputClass}
        value={value}
        placeholder={placeholder || label}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  const Button = ({ children }) => (
    <button
      type="submit"
      className="mt-6 rounded-xl px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition"
    >
      {children}
    </button>
  );

  const tabs = [
    ["customer", "Personal"],
    ["bank", "Bank Account"],
    ["card", "Credit Card"],
    ["loan", "Loan"],
    ["investment", "Investment"],
    ["insurance", "Insurance"],
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Financial Profile
          </h1>
          <p className="text-slate-400 mt-2">
            Add your financial details once. FinAssist AI will use this data to give personalized answers.
          </p>
        </div>

        {message && (
          <div className="mb-6 rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3 text-blue-200">
            {message}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-3 rounded-xl border transition ${
                activeTab === key
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white"
                  : "bg-slate-900 border-slate-800 text-slate-300 hover:border-blue-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "customer" && (
          <SectionCard title="Personal & Income Details">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitData("customer", customer, "Customer profile saved successfully");
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <Field label="Full Name" value={customer.fullName} onChange={(v) => setCustomer({ ...customer, fullName: v })} />
              <Field label="Mobile" value={customer.mobile} onChange={(v) => setCustomer({ ...customer, mobile: v })} />
              <Field label="Monthly Income" type="number" value={customer.monthlyIncome} onChange={(v) => setCustomer({ ...customer, monthlyIncome: v })} />
              <Field label="Annual Income" type="number" value={customer.annualIncome} onChange={(v) => setCustomer({ ...customer, annualIncome: v })} />
              <Field label="Occupation" value={customer.occupation} onChange={(v) => setCustomer({ ...customer, occupation: v })} />
              <Field label="Employment Type" value={customer.employmentType} onChange={(v) => setCustomer({ ...customer, employmentType: v })} />
              <Field label="City" value={customer.city} onChange={(v) => setCustomer({ ...customer, city: v })} />
              <Field label="State" value={customer.state} onChange={(v) => setCustomer({ ...customer, state: v })} />
              <div className="md:col-span-2">
                <Button>Save Personal Details</Button>
              </div>
            </form>
          </SectionCard>
        )}

        {activeTab === "bank" && (
          <SectionCard title="Bank Account">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitData("bank-account", bankAccount, "Bank account added successfully");
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {Object.keys(bankAccount).map((key) => (
                <Field
                  key={key}
                  label={key}
                  value={bankAccount[key]}
                  type={["currentBalance", "availableBalance", "interestRate"].includes(key) ? "number" : "text"}
                  onChange={(v) => setBankAccount({ ...bankAccount, [key]: v })}
                />
              ))}
              <div className="md:col-span-2">
                <Button>Add Bank Account</Button>
              </div>
            </form>
          </SectionCard>
        )}

        {activeTab === "card" && (
          <SectionCard title="Credit Card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitData("credit-card", creditCard, "Credit card added successfully");
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {Object.keys(creditCard).map((key) => (
                <Field
                  key={key}
                  label={key}
                  value={creditCard[key]}
                  type={
                    ["creditLimit", "usedLimit", "availableLimit", "outstandingAmount", "rewardPoints", "annualFee"].includes(key)
                      ? "number"
                      : key === "dueDate"
                      ? "date"
                      : "text"
                  }
                  onChange={(v) => setCreditCard({ ...creditCard, [key]: v })}
                />
              ))}
              <div className="md:col-span-2">
                <Button>Add Credit Card</Button>
              </div>
            </form>
          </SectionCard>
        )}

        {activeTab === "loan" && (
          <SectionCard title="Loan Details">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitData("loan", loan, "Loan added successfully");
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {Object.keys(loan).map((key) => (
                <Field
                  key={key}
                  label={key}
                  value={loan[key]}
                  type={
                    ["loanAmount", "outstanding", "interestRate", "emi", "remainingEmis", "tenureMonths"].includes(key)
                      ? "number"
                      : key === "nextDueDate"
                      ? "date"
                      : "text"
                  }
                  onChange={(v) => setLoan({ ...loan, [key]: v })}
                />
              ))}
              <div className="md:col-span-2">
                <Button>Add Loan</Button>
              </div>
            </form>
          </SectionCard>
        )}

        {activeTab === "investment" && (
          <SectionCard title="Investment Details">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitData("investment", investment, "Investment added successfully");
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {Object.keys(investment).map((key) => (
                <Field
                  key={key}
                  label={key}
                  value={investment[key]}
                  type={["investedAmount", "currentValue", "monthlyContribution", "annualReturn"].includes(key) ? "number" : "text"}
                  onChange={(v) => setInvestment({ ...investment, [key]: v })}
                />
              ))}
              <div className="md:col-span-2">
                <Button>Add Investment</Button>
              </div>
            </form>
          </SectionCard>
        )}

        {activeTab === "insurance" && (
          <SectionCard title="Insurance Details">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitData("insurance", insurance, "Insurance added successfully");
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {Object.keys(insurance).map((key) => (
                <Field
                  key={key}
                  label={key}
                  value={insurance[key]}
                  type={
                    ["coverageAmount", "premium"].includes(key)
                      ? "number"
                      : key === "renewalDate"
                      ? "date"
                      : "text"
                  }
                  onChange={(v) => setInsurance({ ...insurance, [key]: v })}
                />
              ))}
              <div className="md:col-span-2">
                <Button>Add Insurance</Button>
              </div>
            </form>
          </SectionCard>
        )}

        <div className="mt-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Saved Financial Data</h2>
          <pre className="text-xs text-slate-300 overflow-auto max-h-96 bg-slate-950 rounded-xl p-4">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default FinancialProfile;