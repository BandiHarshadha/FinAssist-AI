const profile = {
  income: 0,
  annualIncome: 0,
  expenses: 0,
  emi: 0,
  goal: 0,
  goalPurpose: "",
  loanAmount: 0,
  propertyValue: 0,
  downPayment: 0,
  tenureYears: 0,
  interestRate: 8.5,
};

function toAmount(num, unit) {
  let amount = Number(num);
  if (["lakh", "lakhs", "lac", "lacs"].includes(unit)) amount *= 100000;
  if (["cr", "crore", "crores"].includes(unit)) amount *= 10000000;
  return amount;
}

function extractByPattern(text, patterns) {
  const lower = text.toLowerCase();

  for (const pattern of patterns) {
    const regex = new RegExp(
      `${pattern}\\s*(is|are|:|=|of|for|need)?\\s*(₹|rs)?\\s*(\\d+(\\.\\d+)?)\\s*(lakh|lakhs|lac|lacs|cr|crore|crores)?`,
      "i"
    );

    const match = lower.match(regex);
    if (match) return toAmount(match[3], match[5]);
  }

  return null;
}

function extractTenure(text) {
  const match = text.toLowerCase().match(/(\d+)\s*(year|years|yr|yrs)/);
  return match ? Number(match[1]) : null;
}

function extractInterest(text) {
  const match = text.toLowerCase().match(/(\d+(\.\d+)?)\s*%/);
  return match ? Number(match[1]) : null;
}

export function saveMemory(message) {
  const lower = message.toLowerCase();

  const income = extractByPattern(message, ["income", "salary"]);
  const expenses = extractByPattern(message, ["monthly expenses", "expenses", "expense"]);
  const emi = extractByPattern(message, ["emi"]);
  const goal = extractByPattern(message, ["goal"]);
  const loanAmount = extractByPattern(message, ["loan amount", "loan need", "need loan", "loan"]);
  const propertyValue = extractByPattern(message, ["property value", "house price", "price"]);
  const downPayment = extractByPattern(message, ["down payment", "downpayment"]);

  if (income !== null) {
    if (lower.includes("per annum") || lower.includes("annual") || lower.includes("yearly")) {
      profile.annualIncome = income;
      profile.income = Math.round(income / 12);
    } else {
      profile.income = income;
      profile.annualIncome = income * 12;
    }
  }

  if (expenses !== null) profile.expenses = expenses;
  if (emi !== null) profile.emi = emi;
  if (goal !== null) profile.goal = goal;
  if (loanAmount !== null) profile.loanAmount = loanAmount;
  if (propertyValue !== null) profile.propertyValue = propertyValue;
  if (downPayment !== null) profile.downPayment = downPayment;

  const tenure = extractTenure(message);
  if (tenure !== null) profile.tenureYears = tenure;

  const interest = extractInterest(message);
  if (interest !== null) profile.interestRate = interest;

  if (lower.includes("house") || lower.includes("home")) profile.goalPurpose = "House";
  if (lower.includes("bike")) profile.goalPurpose = "Bike";
  if (lower.includes("car")) profile.goalPurpose = "Car";
}

export function getMemory() {
  return profile;
}

export function resetMemory() {
  Object.assign(profile, {
    income: 0,
    annualIncome: 0,
    expenses: 0,
    emi: 0,
    goal: 0,
    goalPurpose: "",
    loanAmount: 0,
    propertyValue: 0,
    downPayment: 0,
    tenureYears: 0,
    interestRate: 8.5,
  });
}