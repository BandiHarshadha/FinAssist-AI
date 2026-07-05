import { getProfileMemory } from "../memory/userProfileMemory.js";
import {
  calculateEMI,
  checkAffordability,
  calculateGoalPlan,
} from "../utils/financeCalculators.js";

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function formatINR(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

function getProfile() {
  const profile = getProfileMemory();

  const income = profile.income || profile.monthlyIncome || 0;
  const expenses = profile.expenses || profile.monthlyExpenses || 0;
  const emi = profile.emi || 0;
  const savings = income - expenses - emi;

  return { income, expenses, emi, savings };
}

function profileText(profile) {
  if (!profile.income) {
    return "I don’t have your income details yet, so I’ll give general guidance.";
  }

  return `Based on your saved profile:
- Income: ${formatINR(profile.income)}
- Expenses: ${formatINR(profile.expenses)}
- EMI: ${formatINR(profile.emi)}
- Estimated savings: ${formatINR(profile.savings)}`;
}

export function financeKnowledgeAgent(message) {
  const text = message.toLowerCase();
  const profile = getProfile();
  const numbers = text.match(/\d+/g)?.map(Number) || [];

  if (includesAny(text, ["emi calculator", "calculate emi", "emi for"])) {
    const [amount, rate, months] = numbers;

    if (!amount || !rate || !months) {
      return {
        agent: "EMI Calculator Agent",
        reply:
          "I can calculate EMI. Please send like this: EMI for 500000 at 10% for 60 months.",
        data: null,
      };
    }

    const result = calculateEMI(amount, rate, months);

    return {
      agent: "EMI Calculator Agent",
      reply: `Here is your EMI calculation:

Loan amount: ${formatINR(amount)}
Interest rate: ${rate}% per year
Tenure: ${months} months

Monthly EMI: ${formatINR(result.emi)}
Total interest: ${formatINR(result.totalInterest)}
Total payment: ${formatINR(result.totalPayment)}

Tip: If EMI feels high, increase tenure. If total interest feels high, reduce tenure or prepay.`,
      data: result,
    };
  }

  if (
    includesAny(text, [
      "goal",
      "save",
      "reach my goal",
      "how long",
      "financial target",
    ])
  ) {
    const goalAmount = numbers[0];
    const monthlySavings = numbers[1] || profile.savings;

    if (!goalAmount || !monthlySavings) {
      return {
        agent: "Goal Planning Agent",
        reply:
          "I can calculate your goal timeline. Send like this: I want to save 1000000 with 20000 monthly savings.",
        data: null,
      };
    }

    const result = calculateGoalPlan(goalAmount, monthlySavings);

    return {
      agent: "Goal Planning Agent",
      reply: `Goal planning result:

Goal amount: ${formatINR(result.goalAmount)}
Monthly savings: ${formatINR(result.monthlySavings)}

Time needed: ${result.months} months
That is around ${result.years} years and ${result.remainingMonths} months.

Tip: To reach faster, increase monthly savings or invest through suitable SIP/FD depending on your risk and time period.`,
      data: result,
    };
  }

  if (
    includesAny(text, [
      "credit card",
      "cashback",
      "lounge",
      "reward",
      "billing",
      "outstanding",
      "credit limit",
    ])
  ) {
    return {
      agent: "Credit Card Agent",
      reply: `${profileText(profile)}

Yes, I can help with credit cards.

My advice:
- Choose cashback card for shopping/bills.
- Choose travel card only if you travel often.
- Choose fuel card only if fuel spending is high.
- Lifetime-free card is best for beginners.
- Keep usage below 30% of limit.
- Pay full bill before due date.

Tell me your CIBIL score and main spending purpose, then I’ll suggest the best card type.`,
      data: profile,
    };
  }

  if (
    includesAny(text, [
      "savings account",
      "saving account",
      "account balance",
      "minimum balance",
      "statement",
      "open account",
    ])
  ) {
    return {
      agent: "Savings Account Agent",
      reply: `${profileText(profile)}

A savings account is your main money control center.

You can use it for:
- Salary credit
- UPI
- Debit card
- ATM
- Emergency fund
- Bank statement
- Interest earning

Usually needed documents:
- Aadhaar
- PAN
- Mobile number
- Photo
- KYC

Best practice: keep 1–2 months expenses in savings account and move extra money to FD, RD, SIP, or goals.`,
      data: profile,
    };
  }

  if (
    includesAny(text, [
      "can i buy",
      "afford",
      "should i wait",
      "financially smart",
      "buy a bike",
      "buy a car",
      "buy an iphone",
      "buy iphone",
      "buy laptop",
    ])
  ) {
    const newEmi = numbers[0] || 0;

    const affordability = checkAffordability({
      income: profile.income,
      expenses: profile.expenses,
      existingEmi: profile.emi,
      newEmi,
    });

    return {
      agent: "Buying Decision Agent",
      reply: `${profileText(profile)}

I can check if this purchase is safe.

Simple rule:
- If it is a need and EMI is affordable, it may be okay.
- If it is a want, don’t let it reduce emergency fund.
- Total EMI should stay below 35–40% of income.
- Keep monthly savings positive after purchase.

${
  newEmi
    ? `If your new EMI is ${formatINR(newEmi)}, your total EMI becomes ${formatINR(
        affordability.totalEmi
      )}. EMI load is around ${affordability.emiRatio}% of income. Decision: ${
        affordability.decision
      }.`
    : "Tell me item price, down payment, and EMI option. I’ll say: buy now, wait, or avoid."
}`,
      data: affordability,
    };
  }

  if (
    includesAny(text, [
      "loan",
      "emi",
      "personal loan",
      "home loan",
      "vehicle loan",
      "education loan",
    ])
  ) {
    return {
      agent: "Loan & EMI Agent",
      reply: `${profileText(profile)}

Loan safety rule:
- Total EMI should usually stay below 35–40% of monthly income.
- Keep emergency fund before taking new loan.
- Compare interest rate, processing fee, tenure, and foreclosure charges.
- Short tenure saves interest but EMI is higher.
- Long tenure gives comfort but total interest is higher.

Tell me loan amount, interest rate, and tenure. I’ll calculate EMI.`,
      data: profile,
    };
  }

  if (
    includesAny(text, [
      "sip",
      "mutual fund",
      "investment",
      "invest",
      "stocks",
      "stock",
      "fd",
      "fixed deposit",
      "rd",
      "etf",
      "bond",
    ])
  ) {
    return {
      agent: "Investment Agent",
      reply: `${profileText(profile)}

Good investment order:
1. Emergency fund
2. Health insurance
3. Term insurance if family depends on you
4. FD/RD for short-term goals
5. SIP/index funds for long-term goals
6. Stocks only after learning basics

Tell me your goal, time period, and risk level: low, moderate, or high.`,
      data: profile,
    };
  }

  if (
    includesAny(text, [
      "insurance",
      "health insurance",
      "term insurance",
      "life insurance",
      "claim",
    ])
  ) {
    return {
      agent: "Insurance Agent",
      reply: `Insurance is protection, not investment.

Priority:
1. Health insurance
2. Term insurance if someone depends on your income
3. Vehicle insurance if you own vehicle
4. Travel insurance for trips

Avoid buying insurance only for returns. First check cover amount, waiting period, exclusions, claim settlement, and premium.`,
      data: null,
    };
  }

  if (
    includesAny(text, [
      "tax",
      "80c",
      "hra",
      "tds",
      "itr",
      "capital gains",
      "old regime",
      "new regime",
    ])
  ) {
    return {
      agent: "Tax Agent",
      reply: `I can help with tax basics like:

- Old vs new regime
- Section 80C
- HRA
- TDS
- ITR filing
- Capital gains
- Tax-saving investments

Tell me your annual income and deductions. I’ll explain which regime may be better.`,
      data: null,
    };
  }

  if (
    includesAny(text, [
      "budget",
      "save more",
      "reduce expenses",
      "overspending",
      "financial health",
      "emergency fund",
      "debt free",
    ])
  ) {
    return {
      agent: "Budget Planning Agent",
      reply: `${profileText(profile)}

A good monthly budget:
- Needs: 50%
- Wants: 20–30%
- Savings/investments: 20–30%
- EMI: keep under control

To improve financial health:
1. Track spending.
2. Reduce unnecessary wants.
3. Build emergency fund.
4. Avoid high-interest debt.
5. Invest monthly for goals.`,
      data: profile,
    };
  }

  if (
    includesAny(text, [
      "upi",
      "failed transaction",
      "money deducted",
      "upi pin",
      "qr payment",
    ])
  ) {
    return {
      agent: "UPI Banking Agent",
      reply: `For UPI failed transaction:

1. Check if money was deducted.
2. Save UPI transaction/reference ID.
3. Check beneficiary bank status.
4. Wait for automatic reversal if transaction failed.
5. Raise complaint inside UPI app or bank app if delayed.

Never share UPI PIN, OTP, CVV, or password with anyone.`,
      data: null,
    };
  }

  if (
    includesAny(text, [
      "cibil",
      "credit score",
      "utilization",
      "hard inquiry",
    ])
  ) {
    return {
      agent: "Credit Score Agent",
      reply: `To improve CIBIL/credit score:

- Pay credit card bills on time.
- Pay EMIs before due date.
- Keep credit utilization below 30%.
- Avoid many loan/card applications together.
- Do not close oldest credit account suddenly.
- Check credit report errors.
- Use credit card like a payment tool, not extra income.`,
      data: profile,
    };
  }

  if (
    includesAny(text, ["fraud", "scam", "otp", "phishing", "hacked", "cloned"])
  ) {
    return {
      agent: "Fraud Safety Agent",
      reply: `Important: if fraud happened, act immediately.

Do this:
1. Block card/account access.
2. Call bank customer care.
3. Change passwords.
4. Report to cybercrime portal.
5. Keep transaction proof.
6. Never share OTP, PIN, CVV, UPI PIN, or password.

Banks never ask for OTP or PIN.`,
      data: null,
    };
  }

  return null;
}