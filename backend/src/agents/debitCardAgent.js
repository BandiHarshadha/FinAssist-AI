export function debitCardAgent() {
  return {
    agent: "Debit Card Agent",
    reply: `A debit card is linked directly to your bank account, so you can spend only the money available in your account.

I can help with:
• New debit card request
• ATM withdrawal limit
• Online transaction enable/disable
• PIN generation
• Lost card blocking
• Difference between debit card and credit card

For safety, never share PIN, CVV, OTP, or card photo with anyone.`,
    data: { type: "debit_card_help" },
  };
}
