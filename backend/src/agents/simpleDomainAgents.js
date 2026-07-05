export function netBankingAgent() {
  return {
    agent: "Net Banking Agent",
    reply: `Net banking helps you manage your bank account online.

I can help with:
• Login/register process
• Password reset
• Fund transfer
• Beneficiary addition
• Transaction limits
• Safety tips

Never share net banking password, OTP, MPIN, or screen access with anyone.`,
    data: { type: "net_banking_help" },
  };
}

export function forexAgent() {
  return {
    agent: "Forex Agent",
    reply: `Forex means foreign currency exchange.

I can help with:
• Currency exchange basics
• International travel card
• Outward remittance
• Exchange rate meaning
• Forex charges

For exact rates and charges, always verify with your bank because rates change daily.`,
    data: { type: "forex_help" },
  };
}

export function businessBankingAgent() {
  return {
    agent: "Business Banking Agent",
    reply: `Business banking helps with current accounts, MSME loans, business payments, GST-linked banking, and working capital.

To guide you properly, tell me:
• Business type
• Monthly turnover
• Need: current account, loan, payment gateway, or working capital
• Existing loans, if any`,
    data: { type: "business_banking_help" },
  };
}

export function retirementAgent() {
  return {
    agent: "Retirement Agent",
    reply: `Retirement planning means building enough money so future expenses are covered without depending only on salary.

A simple approach:
• Estimate future monthly expenses
• Build emergency fund first
• Start SIP/PPF/NPS/EPF-style long-term investing
• Increase investment every year
• Keep insurance separate from investment

Share your age, monthly expenses, and target retirement age for a proper plan.`,
    data: { type: "retirement_help" },
  };
}
