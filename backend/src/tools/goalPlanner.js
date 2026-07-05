export function planGoal({ goalAmount = 0, monthlySavings = 0 }) {
  const goal = Number(goalAmount || 0);
  const savings = Number(monthlySavings || 0);

  if (goal <= 0 || savings <= 0) {
    return { months: 0, years: 0, possible: false };
  }

  const months = Math.ceil(goal / savings);
  return {
    months,
    years: Number((months / 12).toFixed(1)),
    possible: true,
  };
}
