export function calculateRD({ monthlyDeposit = 0, annualRate = 0, months = 12 }) {
  const p = Number(monthlyDeposit || 0);
  const n = Number(months || 0);
  const r = Number(annualRate || 0) / 400; // quarterly compounding approximation

  if (p <= 0 || n <= 0) {
    return { invested: 0, maturity: 0, interest: 0 };
  }

  const maturity = p * n + (p * n * (n + 1) * r) / 240;
  const rounded = Math.round(maturity);

  return {
    invested: p * n,
    maturity: rounded,
    interest: rounded - p * n,
  };
}
