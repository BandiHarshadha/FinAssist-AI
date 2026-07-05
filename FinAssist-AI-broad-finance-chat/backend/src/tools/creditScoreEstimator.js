export function estimateCreditScore({ emiLoad = 0, hasCreditHistory = false, latePayments = 0 }) {
  let score = hasCreditHistory ? 730 : 680;

  if (emiLoad > 40) score -= 70;
  else if (emiLoad > 30) score -= 35;
  else if (emiLoad < 20) score += 20;

  score -= Number(latePayments || 0) * 45;

  score = Math.max(300, Math.min(900, Math.round(score)));

  let band = "Fair";
  if (score >= 750) band = "Excellent";
  else if (score >= 700) band = "Good";
  else if (score < 650) band = "Needs improvement";

  return { score, band };
}
