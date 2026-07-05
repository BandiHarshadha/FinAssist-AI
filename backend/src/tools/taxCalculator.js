export function estimateOldRegimeTax(taxableIncome = 0) {
  const income = Number(taxableIncome || 0);
  let tax = 0;

  if (income > 1000000) tax += (income - 1000000) * 0.3;
  if (income > 500000) tax += (Math.min(income, 1000000) - 500000) * 0.2;
  if (income > 250000) tax += (Math.min(income, 500000) - 250000) * 0.05;

  return Math.round(tax * 1.04);
}

export function estimateNewRegimeTax(taxableIncome = 0) {
  const income = Number(taxableIncome || 0);
  const slabs = [
    [300000, 0],
    [600000, 0.05],
    [900000, 0.1],
    [1200000, 0.15],
    [1500000, 0.2],
    [Infinity, 0.3],
  ];

  let previous = 0;
  let tax = 0;

  for (const [limit, rate] of slabs) {
    if (income > previous) {
      tax += (Math.min(income, limit) - previous) * rate;
      previous = limit;
    }
  }

  return Math.round(tax * 1.04);
}
