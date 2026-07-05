import { getProfileMemory } from "../memory/userProfileMemory.js";

const money = (amount) => `₹${Number(amount || 0).toLocaleString("en-IN")}`;

const profileSnapshot = () => {
  const profile = getProfileMemory();
  const income = profile.income || profile.monthlyIncome || profile.annualIncome / 12 || 0;
  const expenses = profile.expenses || profile.monthlyExpenses || 0;
  const emi = profile.emi || 0;
  const savings = income - expenses - emi;
  const savingsRate = income ? Math.round((savings / income) * 100) : 0;
  const emiLoad = income ? Math.round((emi / income) * 100) : 0;
  return { income, expenses, emi, savings, savingsRate, emiLoad };
};

const hasAny = (text, words) => words.some((word) => text.includes(word));

const CATEGORY_RULES = [
  {
    agent: "Savings Account Advisor",
    keys: ["savings account", "saving account", "open account", "account balance", "statement", "minimum balance", "account frozen", "account blocked", "inactive account", "reactivate account", "interest credited", "aadhaar mandatory", "minor account"],
    reply: (p) => `I can help with savings account questions like opening an account, documents, balance, statement, interest, charges, blocked/frozen account, and reactivation.\n\nFor opening a savings account, usually you need PAN, Aadhaar or valid address proof, photo, mobile number, and basic KYC. Many banks allow online account opening through Aadhaar-based video KYC. Minors can also open accounts, usually with guardian support.\n\nFor your money planning, your estimated monthly savings are ${money(p.savings)} and savings rate is ${p.savingsRate}%. Keep 1–2 months expenses in savings account and move extra money to FD/SIP based on goal duration.`
  },
  {
    agent: "Current Account Advisor",
    keys: ["current account", "business account", "gst required", "freelancer account", "overdraft", "cash credit"],
    reply: () => `A current account is mainly for business transactions. It usually has higher minimum balance, no savings-style interest, and supports more frequent deposits/withdrawals.\n\nSavings account = personal use and interest.\nCurrent account = business/freelance/MSME use.\n\nGST is not always mandatory for every freelancer, but banks may ask for business proof, PAN, address proof, shop/business registration, GST if available, and KYC documents.`
  },
  {
    agent: "Debit Card Advisor",
    keys: ["debit card", "atm card", "generate pin", "forgot pin", "change pin", "lost my card", "block my card", "atm withdrawal", "contactless", "international transaction", "online payment not working"],
    reply: () => `For debit card issues, first decide if it is usage, PIN, limit, or security.\n\nIf card is lost or fraud happened: block/freeze immediately through bank app, customer care, or net banking.\nIf online payment is not working: check card online usage, daily limit, international usage, expiry, CVV, and bank server status.\nFor PIN: use ATM, mobile banking, or net banking to generate/change PIN.\n\nDebit card is safest for daily spending because it uses your own bank balance.`
  },
  {
    agent: "Credit Card Advisor",
    keys: ["credit card", "cashback card", "travel card", "fuel card", "student credit card", "lifetime free", "credit limit", "minimum payment", "total outstanding", "reward points", "lounge access", "convert purchase to emi", "card cloned"],
    reply: (p) => `Yes, I can guide you on credit cards.\n\nBased on your profile:\n- Monthly income: ${money(p.income)}\n- Expenses: ${money(p.expenses)}\n- Existing EMI: ${money(p.emi)}\n- Estimated savings: ${money(p.savings)}\n\nGood rule: use a credit card only if you can pay the full bill before due date. Keep utilization below 30% of limit. Avoid paying only minimum due because interest becomes very high.\n\nFor card choice: cashback = shopping/bills, fuel card = petrol, travel card = flights/hotels/lounge, lifetime-free = beginner.`
  },
  {
    agent: "Loan Advisor",
    keys: ["personal loan", "home loan", "vehicle loan", "car loan", "bike loan", "education loan", "gold loan", "loan eligibility", "loan status", "interest rate", "foreclosure", "prepayment", "top-up loan", "moratorium", "collateral", "pmay", "stamp duty", "registration charges", "balance transfer", "loan against property"],
    reply: (p) => `For any loan, EMI safety is most important.\n\nYour current EMI load is ${p.emiLoad}% of income. A safe total EMI limit is usually below 35–40% of monthly income.\n\nShare loan amount, interest rate, and tenure, and I can calculate EMI and affordability.\n\nGeneral advice:\n- Personal loan: use only for important needs.\n- Home loan: check down payment, stamp duty, registration, tax benefits, and floating/fixed rate.\n- Vehicle loan: keep EMI around 10–15% of income.\n- Education loan: check moratorium, collateral, and repayment start date.\n- Gold loan: compare interest and foreclosure rules.`
  },
  {
    agent: "FD & RD Advisor",
    keys: ["fixed deposit", "fd", "recurring deposit", "rd", "fd calculator", "rd calculator", "premature withdrawal", "fd maturity", "monthly income fd", "senior citizen", "missed installment"],
    reply: () => `FD and RD are good for safe, short-term or medium-term goals.\n\nFD = one-time deposit.\nRD = monthly deposit.\n\nUse FD/RD for emergency backup, fees, near-term purchases, or low-risk savings. Check interest rate, premature withdrawal penalty, tax on interest, and maturity date before opening.`
  },
  {
    agent: "Investment Advisor",
    keys: ["mutual fund", "sip", "lump sum", "index fund", "elss", "tax saving mutual fund", "portfolio", "stock", "ipo", "dividend", "growth stock", "bond", "government bond", "corporate bond", "etf", "gold etf", "nifty etf", "invest", "investment"],
    reply: () => `For investing, start in this order: emergency fund, insurance, then investments.\n\nBeginner-friendly plan:\n- Short-term goal: savings/FD/RD/debt fund.\n- Long-term goal: SIP in diversified mutual funds/index funds.\n- Tax saving: ELSS if suitable.\n- Stocks/IPO: only after learning risk.\n- Gold ETF: optional diversification.\n\nTell me your monthly investment amount, goal duration, and risk level: low, moderate, or high.`
  },
  {
    agent: "Insurance Advisor",
    keys: ["health insurance", "life insurance", "term insurance", "family floater", "waiting period", "claim process", "vehicle insurance", "travel insurance", "third-party", "comprehensive insurance", "cover do i need"],
    reply: () => `Insurance is protection, not investment.\n\nImportant types:\n- Health insurance: check room rent, waiting period, exclusions, claim settlement, network hospitals.\n- Term insurance: useful if family depends on your income; cover is often around 10–15x annual income.\n- Vehicle insurance: third-party is basic mandatory cover; comprehensive gives wider protection.\n- Travel insurance: useful for international trips and medical emergencies.`
  },
  {
    agent: "Tax Advisor",
    keys: ["income tax", "old regime", "new regime", "80c", "hra", "capital gains", "tds", "advance tax", "itr", "tax saving"],
    reply: () => `I can explain tax in simple steps.\n\nMain areas:\n- Compare old vs new regime based on deductions.\n- 80C includes options like ELSS, PPF, EPF, life insurance premium, etc.\n- HRA can help if you pay rent and old regime is chosen.\n- Capital gains tax depends on asset type and holding period.\n- TDS is tax deducted before money reaches you.\n\nTell me your annual income, deductions, rent, and investments, and I’ll estimate which regime may be better.`
  },
  {
    agent: "Budget & Financial Planning Agent",
    keys: ["budget", "reduce expenses", "save more", "family budget", "wedding budget", "vacation budget", "retirement", "emergency fund", "net worth", "financial health", "debt management", "goal planning", "financially independent", "where is my money going", "overspending", "run out of money", "mistakes"],
    reply: (p) => `Let’s make this practical.\n\nYour current profile shows:\n- Income: ${money(p.income)}\n- Expenses: ${money(p.expenses)}\n- EMI: ${money(p.emi)}\n- Estimated savings: ${money(p.savings)}\n- Savings rate: ${p.savingsRate}%\n\nA healthy plan:\n1. Track spending category-wise.\n2. Keep emergency fund.\n3. Reduce high-interest debt.\n4. Save/invest monthly before spending extra.\n5. Separate short-term and long-term goals.\n\nAsk me “analyze my spending” or “make my monthly budget” and I’ll create a detailed plan.`
  },
  {
    agent: "Buying Decision Agent",
    keys: ["can i buy", "afford", "iphone", "laptop", "house", "bike", "car", "should i wait", "financially smart", "safe spend"],
    reply: (p) => `I can help decide buy now vs wait.\n\nYour estimated monthly savings are ${money(p.savings)}.\n\nSafe buying rule:\n- Need-based purchase: okay if emergency fund remains safe.\n- Want/luxury purchase: EMI should not disturb savings goals.\n- Car/bike EMI: ideally 10–15% of income.\n- House EMI: total EMI should stay below 35–40% of income.\n\nTell me item price and EMI option, and I’ll give a clear buy/wait decision.`
  },
  {
    agent: "Credit Score Coach",
    keys: ["credit score", "cibil", "improve score", "score decreased", "loan rejected", "credit utilization", "hard inquiry"],
    reply: () => `Credit score improves when you pay on time and use credit carefully.\n\nDo this:\n- Pay loan/card bills before due date.\n- Keep credit utilization below 30%.\n- Avoid many loan/card applications together.\n- Do not settle loans unless unavoidable.\n- Check credit report for errors.\n\nA low score can cause loan rejection or higher interest.`
  },
  {
    agent: "Digital Banking Support",
    keys: ["upi", "failed transaction", "money deducted", "upi pin", "qr payment", "net banking", "forgot password", "reset password", "unlock account", "beneficiary", "neft", "rtgs", "imps", "schedule payment"],
    reply: () => `For UPI/net banking issues:\n\nIf money is deducted but not received, wait for bank reversal timeline and raise a complaint with transaction ID.\nFor UPI PIN problems, reset through UPI app using debit card details.\nFor net banking lock/password issues, use bank's official website/app only.\nFor NEFT/RTGS/IMPS, verify beneficiary name, account number, IFSC, and transfer limits before sending.`
  },
  {
    agent: "Fraud & Security Agent",
    keys: ["fraud", "hacked", "otp scam", "fake call", "phishing", "unauthorized", "card cloned", "report fraud", "freeze account", "someone used"],
    reply: () => `This may be a security issue. Act immediately.\n\nSteps:\n1. Block/freeze card or account from official bank app/customer care.\n2. Do not share OTP, PIN, CVV, password, or screen.\n3. Change net banking/UPI password or PIN.\n4. Report to bank with transaction ID.\n5. Report cyber fraud through official cybercrime helpline/portal in your country.\n\nFinAssist can guide, but bank/cybercrime reporting should be done quickly.`
  },
  {
    agent: "Forex & International Banking Advisor",
    keys: ["forex", "currency exchange", "swift", "international payment", "foreign transaction", "forex card", "receive international"],
    reply: () => `For international banking, check exchange rate, forex markup, SWIFT charges, receiving bank charges, and purpose code.\n\nForex card is useful for travel. SWIFT is used for international transfers. Credit/debit cards may have foreign transaction markup, so compare charges before use.`
  },
  {
    agent: "Business Banking Advisor",
    keys: ["msme", "working capital", "invoice financing", "pos machine", "merchant account", "business insurance", "gst account"],
    reply: () => `For business banking, focus on cash flow.\n\nUseful products:\n- Current account for business transactions.\n- Working capital/MSME loan for operations.\n- Cash credit/overdraft for short-term needs.\n- POS/merchant account for payments.\n- Invoice financing if payments are delayed.\n- Business insurance for risk protection.`
  },
  {
    agent: "General Banking Assistant",
    keys: ["bank timings", "branch near", "atm near", "ifsc", "swift code", "cheque book", "stop cheque", "account closure", "nominee", "update pan", "update aadhaar", "change mobile", "change address", "change email", "kyc", "dormant"],
    reply: () => `I can help with general banking tasks like IFSC/SWIFT understanding, cheque book request, stop cheque, nominee update, PAN/Aadhaar/mobile/address/email update, KYC, and dormant account activation.\n\nFor actual account-specific changes, use your bank's official app, branch, or customer care. I can tell you the usual documents and steps.`
  }
];

export function financeKnowledgeAgent(message) {
  const text = message.toLowerCase();
  const profile = profileSnapshot();
  const matched = CATEGORY_RULES.find((rule) => hasAny(text, rule.keys));

  if (!matched) return null;

  return {
    agent: matched.agent,
    reply: matched.reply(profile),
    data: {
      type: "broad_finance_answer",
      profile,
      matchedAgent: matched.agent,
    },
  };
}
