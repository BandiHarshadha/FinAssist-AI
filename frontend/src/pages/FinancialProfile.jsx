import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/financial-profile";

const inputClass =
  "w-full rounded-xl bg-slate-950/70 border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

function Field({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-slate-300 mb-2 block">{label}</label>
      <input
        type={type}
        className={inputClass}
        value={value || ""}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TwinStat({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-2 text-2xl font-bold text-white">{value}</h3>
    </div>
  );
}

function FinancialProfile() {
  const [activeTab, setActiveTab] = useState("customer");
  const [profile, setProfile] = useState(null);
  const [digitalTwin, setDigitalTwin] = useState(null);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [customer, setCustomer] = useState({
    fullName: "",
    mobile: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    annualIncome: "",
    occupation: "",
    employmentType: "",
    city: "",
    state: "",
  });

  const emptyForms = {
    bank: {
      bankName: "",
      accountType: "Savings",
      branch: "",
      ifsc: "",
      maskedAccountNumber: "",
      currentBalance: "",
      availableBalance: "",
      interestRate: "",
      status: "Active",
    },
    card: {
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
    },
    loan: {
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
    },
    investment: {
      investmentType: "",
      investmentName: "",
      investedAmount: "",
      currentValue: "",
      monthlyContribution: "",
      annualReturn: "",
      status: "Active",
    },
    insurance: {
      insuranceType: "",
      insurer: "",
      policyNumber: "",
      coverageAmount: "",
      premium: "",
      renewalDate: "",
      status: "Active",
    },
  };

  const [forms, setForms] = useState(emptyForms);

  const tabs = [
    ["customer", "Personal"],
    ["bank", "Bank Account"],
    ["card", "Credit Card"],
    ["loan", "Loan"],
    ["investment", "Investment"],
    ["insurance", "Insurance"],
  ];

  const config = {
    bank: {
      title: "Bank Account",
      endpoint: "bank-account",
      listKey: "bankAccounts",
      success: "Bank account saved",
      fields: [
        "bankName",
        "accountType",
        "branch",
        "ifsc",
        "maskedAccountNumber",
        "currentBalance",
        "availableBalance",
        "interestRate",
        "status",
      ],
    },
    card: {
      title: "Credit Card",
      endpoint: "credit-card",
      listKey: "creditCards",
      success: "Credit card saved",
      fields: [
        "cardName",
        "bankName",
        "cardNetwork",
        "maskedCardNumber",
        "creditLimit",
        "usedLimit",
        "availableLimit",
        "outstandingAmount",
        "dueDate",
        "billingCycle",
        "rewardPoints",
        "annualFee",
        "status",
      ],
    },
    loan: {
      title: "Loan",
      endpoint: "loan",
      listKey: "loans",
      success: "Loan saved",
      fields: [
        "loanType",
        "lenderName",
        "loanAmount",
        "outstanding",
        "interestRate",
        "emi",
        "remainingEmis",
        "tenureMonths",
        "nextDueDate",
        "status",
      ],
    },
    investment: {
      title: "Investment",
      endpoint: "investment",
      listKey: "investments",
      success: "Investment saved",
      fields: [
        "investmentType",
        "investmentName",
        "investedAmount",
        "currentValue",
        "monthlyContribution",
        "annualReturn",
        "status",
      ],
    },
    insurance: {
      title: "Insurance",
      endpoint: "insurance",
      listKey: "insurance",
      success: "Insurance saved",
      fields: [
        "insuranceType",
        "insurer",
        "policyNumber",
        "coverageAmount",
        "premium",
        "renewalDate",
        "status",
      ],
    },
  };

  const formatINR = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const fetchProfile = async () => {
    const res = await fetch(`${API_URL}/me`, { headers });
    const data = await res.json();

    if (data.success) {
      setProfile(data.data);

      if (data.data.customerProfile) {
        setCustomer({
          fullName: data.data.customerProfile.fullName || "",
          mobile: data.data.customerProfile.mobile || "",
          monthlyIncome:
            data.data.customerProfile.monthlyIncome ||
            data.data.monthlyIncome ||
            "",
          monthlyExpenses:
            data.data.customerProfile.monthlyExpenses ||
            data.data.monthlyExpenses ||
            "",
          annualIncome:
            data.data.customerProfile.annualIncome ||
            data.data.annualIncome ||
            "",
          occupation: data.data.customerProfile.occupation || "",
          employmentType: data.data.customerProfile.employmentType || "",
          city: data.data.customerProfile.city || "",
          state: data.data.customerProfile.state || "",
        });
      }
    }
  };

  const fetchDigitalTwin = async () => {
    const res = await fetch(`${API_URL}/digital-twin`, { headers });
    const data = await res.json();

    if (data.success) {
      setDigitalTwin(data.data);
    }
  };

  const refreshAll = async () => {
    await fetchProfile();
    await fetchDigitalTwin();
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const saveCustomer = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/customer`, {
      method: "POST",
      headers,
      body: JSON.stringify(customer),
    });

    const data = await res.json();

    if (data.success) {
      setMessage("Personal details saved. Digital Twin updated.");
      await refreshAll();
    } else {
      setMessage(data.message || "Unable to save");
    }
  };

  const saveTabData = async (e, key) => {
    e.preventDefault();

    const selected = config[key];
    const isEditing = Boolean(editingId);

    const url = isEditing
      ? `${API_URL}/${selected.endpoint}/${editingId}`
      : `${API_URL}/${selected.endpoint}`;

    const res = await fetch(url, {
      method: isEditing ? "PUT" : "POST",
      headers,
      body: JSON.stringify(forms[key]),
    });

    const data = await res.json();

    if (data.success) {
      setMessage(`${selected.success}. Digital Twin updated.`);
      setForms({ ...forms, [key]: emptyForms[key] });
      setEditingId(null);
      await refreshAll();
    } else {
      setMessage(data.message || "Unable to save");
    }
  };

  const editItem = (key, item) => {
    setActiveTab(key);
    setEditingId(item.id);
    setForms({
      ...forms,
      [key]: {
        ...emptyForms[key],
        ...item,
      },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = (key) => {
    setEditingId(null);
    setForms({ ...forms, [key]: emptyForms[key] });
  };

  const renderForm = (key) => {
    const selected = config[key];

    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-5">
          {editingId ? `Edit ${selected.title}` : `Add ${selected.title}`}
        </h2>

        <form
          onSubmit={(e) => saveTabData(e, key)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {selected.fields.map((field) => (
            <Field
              key={field}
              label={field}
              type={
                field.toLowerCase().includes("date")
                  ? "date"
                  : [
                      "currentBalance",
                      "availableBalance",
                      "interestRate",
                      "creditLimit",
                      "usedLimit",
                      "outstandingAmount",
                      "rewardPoints",
                      "annualFee",
                      "loanAmount",
                      "outstanding",
                      "emi",
                      "remainingEmis",
                      "tenureMonths",
                      "investedAmount",
                      "currentValue",
                      "monthlyContribution",
                      "annualReturn",
                      "coverageAmount",
                      "premium",
                    ].includes(field)
                  ? "number"
                  : "text"
              }
              value={forms[key][field]}
              onChange={(v) =>
                setForms({
                  ...forms,
                  [key]: {
                    ...forms[key],
                    [field]: v,
                  },
                })
              }
            />
          ))}

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="rounded-xl px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition"
            >
              {editingId ? "Save Changes" : `Save ${selected.title}`}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => cancelEdit(key)}
                className="rounded-xl px-6 py-3 bg-slate-800 border border-slate-700 text-white"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <SavedList tabKey={key} config={selected} profile={profile} onEdit={editItem} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Financial Profile
        </h1>

        <p className="text-slate-400 mb-8">
          Add your financial details once. FinAssist AI will use this profile automatically in chat.
        </p>

        {message && (
          <div className="mb-6 rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3 text-blue-200">
            {message}
          </div>
        )}

        {digitalTwin && (
          <div className="mb-8 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Financial Digital Twin</h2>
                <p className="text-slate-400">
                  Updated automatically from saved profile data.
                </p>
              </div>

              <button
                onClick={fetchDigitalTwin}
                className="rounded-xl px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium"
              >
                Refresh Twin
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <TwinStat title="Financial Score" value={`${digitalTwin.financialScore || 0}/100`} />
              <TwinStat title="Net Worth" value={formatINR(digitalTwin.netWorth)} />
              <TwinStat title="Monthly Savings" value={formatINR(digitalTwin.monthlySavings)} />
              <TwinStat title="EMI Ratio" value={`${digitalTwin.emiRatio || 0}%`} />
              <TwinStat title="Risk Level" value={digitalTwin.riskLevel || "Unknown"} />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setEditingId(null);
              }}
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
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-5">
              Personal & Income Details
            </h2>

            <form
              onSubmit={saveCustomer}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <Field label="Full Name" value={customer.fullName} onChange={(v) => setCustomer({ ...customer, fullName: v })} />
              <Field label="Mobile" value={customer.mobile} onChange={(v) => setCustomer({ ...customer, mobile: v })} />
              <Field label="Monthly Income" type="number" value={customer.monthlyIncome} onChange={(v) => setCustomer({ ...customer, monthlyIncome: v })} />
              <Field label="Monthly Expenses" type="number" value={customer.monthlyExpenses} onChange={(v) => setCustomer({ ...customer, monthlyExpenses: v })} />
              <Field label="Annual Income" type="number" value={customer.annualIncome} onChange={(v) => setCustomer({ ...customer, annualIncome: v })} />
              <Field label="Occupation" value={customer.occupation} onChange={(v) => setCustomer({ ...customer, occupation: v })} />
              <Field label="Employment Type" value={customer.employmentType} onChange={(v) => setCustomer({ ...customer, employmentType: v })} />
              <Field label="City" value={customer.city} onChange={(v) => setCustomer({ ...customer, city: v })} />
              <Field label="State" value={customer.state} onChange={(v) => setCustomer({ ...customer, state: v })} />

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="rounded-xl px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition"
                >
                  Save Personal Details
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab !== "customer" && renderForm(activeTab)}
      </div>
    </div>
  );
}

function SavedList({ tabKey, config, profile, onEdit }) {
  const items = profile?.[config.listKey] || [];

  if (!items.length) {
    return (
      <p className="mt-6 text-slate-400 text-sm">
        No saved {config.title.toLowerCase()} details yet.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Saved {config.title} Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5"
          >
            <div className="flex justify-between gap-4 mb-3">
              <h4 className="font-semibold text-white">
                {item.bankName ||
                  item.cardName ||
                  item.loanType ||
                  item.investmentName ||
                  item.insuranceType ||
                  "Saved Item"}
              </h4>

              <button
                onClick={() => onEdit(tabKey, item)}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Edit
              </button>
            </div>

            <div className="space-y-1 text-sm text-slate-400">
              {Object.entries(item)
                .filter(([key]) => !["id", "createdAt", "updatedAt"].includes(key))
                .map(([key, value]) => (
                  <p key={key}>
                    <span className="text-slate-300">{key}:</span>{" "}
                    {String(value || "-")}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinancialProfile;