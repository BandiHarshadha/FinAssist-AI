export function detectAgentIntent(message = "") {
  const text = message.toLowerCase();

  if (
    text.includes("credit card") ||
    text.includes("card eligibility") ||
    text.includes("can i get a card")
  ) {
    return "CREDIT_CARD";
  }

  if (
    text.includes("loan") ||
    text.includes("home loan") ||
    text.includes("vehicle loan") ||
    text.includes("personal loan") ||
    text.includes("emi")
  ) {
    return "LOAN";
  }

  if (
    text.includes("save") ||
    text.includes("savings") ||
    text.includes("monthly saving") ||
    text.includes("how much can i save")
  ) {
    return "SAVINGS";
  }

  if (
    text.includes("invest") ||
    text.includes("sip") ||
    text.includes("mutual fund") ||
    text.includes("stock")
  ) {
    return "INVESTMENT";
  }

  if (
    text.includes("buy") ||
    text.includes("afford") ||
    text.includes("can i purchase") ||
    text.includes("should i buy")
  ) {
    return "BUYING_DECISION";
  }

  if (
    text.includes("insurance") ||
    text.includes("health insurance") ||
    text.includes("life insurance")
  ) {
    return "INSURANCE";
  }

  if (
    text.includes("digital twin") ||
    text.includes("financial twin") ||
    text.includes("financial score") ||
    text.includes("net worth")
  ) {
    return "DIGITAL_TWIN";
  }

  if (
    text.includes("financial plan") ||
    text.includes("cfp") ||
    text.includes("plan my money")
  ) {
    return "AI_CFP";
  }

  return "GENERAL_FINANCE";
}