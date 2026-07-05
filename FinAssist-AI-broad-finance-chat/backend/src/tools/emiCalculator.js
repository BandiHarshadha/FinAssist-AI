export const emiCalculator = (principal, annualRate, years) => {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  const emi =
    principal *
    monthlyRate *
    Math.pow(1 + monthlyRate, months) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return {
    principal,
    annualRate,
    years,
    emi: emi.toFixed(2),
  };
};