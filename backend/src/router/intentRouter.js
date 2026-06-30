export function detectIntent(transcript) {
  const text = String(transcript || "").toLowerCase();

  if (
    text.includes("what if") ||
    text.includes("simulate") ||
    text.includes("simulation")
  ) {
    return "what_if";
  }

  if (
    text.includes("digital twin") ||
    text.includes("financial twin") ||
    text.includes("my twin") ||
    text.includes("financial profile")
  ) {
    return "digital_twin";
  }

  if (
    text.includes("review") ||
    text.includes("full profile") ||
    text.includes("financial plan") ||
    text.includes("langgraph")
  ) {
    return "full_review";
  }

  if (
    text.includes("save") ||
    text.includes("saving") ||
    text.includes("budget") ||
    text.includes("expense") ||
    text.includes("spending")
  ) {
    return "budget";
  }

  if (
    text.includes("buy") ||
    text.includes("purchase") ||
    text.includes("afford") ||
    text.includes("laptop") ||
    text.includes("phone")
  ) {
    return "buying";
  }

  if (
    text.includes("loan") ||
    text.includes("emi") ||
    text.includes("borrow") ||
    text.includes("credit")
  ) {
    return "loan";
  }

  if (
    text.includes("invest") ||
    text.includes("sip") ||
    text.includes("mutual fund") ||
    text.includes("stock")
  ) {
    return "investment";
  }

  if (text.includes("insurance")) {
    return "insurance";
  }

  if (
    text.includes("goal") ||
    text.includes("house") ||
    text.includes("target")
  ) {
    return "goal";
  }

  if (text.includes("health") || text.includes("score")) {
    return "health";
  }

  if (text.includes("tax") || text.includes("itr")) {
    return "tax";
  }

  return "general";
}