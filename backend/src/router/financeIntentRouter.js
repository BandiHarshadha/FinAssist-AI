const ROUTES = [
  { intent: "digital_twin", keywords: ["digital twin", "financial twin", "my twin", "financial profile"] },
  { intent: "ai_cfp", keywords: ["ai cfp", "cfp", "financial planner", "financial planning", "money plan", "personal finance review"] },
  { intent: "what_if", keywords: ["what if", "simulate", "simulation"] },
  { intent: "buying", keywords: ["can i buy", "should i buy", "afford", "purchase", "buy", "laptop", "phone"] },
  { intent: "fraud", keywords: ["fraud", "scam", "otp", "phishing", "kyc link", "cyber", "upi pin", "cvv"] },
  { intent: "upi", keywords: ["upi", "gpay", "phonepe", "paytm", "qr", "collect request"] },
  { intent: "credit_card", keywords: ["credit card", "card limit", "cashback card", "reward card", "card bill", "minimum due"] },
  { intent: "debit_card", keywords: ["debit card", "atm card", "atm withdrawal", "card pin"] },
  { intent: "home_loan", keywords: ["home loan", "housing loan", "house loan"] },
  { intent: "vehicle_loan", keywords: ["vehicle loan", "car loan", "bike loan", "two wheeler loan"] },
  { intent: "education_loan", keywords: ["education loan", "study loan", "student loan"] },
  { intent: "gold_loan", keywords: ["gold loan"] },
  { intent: "loan", keywords: ["loan", "emi", "borrow", "personal loan"] },
  { intent: "fd_rd", keywords: ["fd", "fixed deposit", "rd", "recurring deposit"] },
  { intent: "investment", keywords: ["investment", "invest", "sip", "mutual fund", "stock", "shares", "portfolio"] },
  { intent: "insurance", keywords: ["insurance", "term plan", "health cover", "life cover"] },
  { intent: "tax", keywords: ["tax", "itr", "income tax", "form 16", "80c", "80d", "hra"] },
  { intent: "savings", keywords: ["savings account", "saving account", "save money", "monthly savings", "emergency fund"] },
  { intent: "budget", keywords: ["budget", "expense", "spending", "monthly expense"] },
  { intent: "retirement", keywords: ["retirement", "retire", "pension"] },
  { intent: "forex", keywords: ["forex", "foreign exchange", "currency exchange", "international transfer"] },
  { intent: "business_banking", keywords: ["business banking", "current account", "msme", "business loan"] },
  { intent: "net_banking", keywords: ["net banking", "internet banking", "mobile banking"] },
  { intent: "faq", keywords: ["what is", "how to", "explain"] },
];

export function routeFinanceIntent(message = "") {
  const text = String(message).toLowerCase();

  for (const route of ROUTES) {
    if (route.keywords.some((keyword) => text.includes(keyword))) {
      return route.intent;
    }
  }

  return "general";
}
