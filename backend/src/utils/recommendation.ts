export function getRecommendation(current: number, history: number[]) {
  const lowest = Math.min(...history);
  const avg = history.reduce((a, b) => a + b, 0) / history.length;

  if (current <= lowest * 1.10) {
    return "Good time to buy ✅";
  }

  if (current > avg) {
    return "Price higher than usual, wait ⏳";
  }

  return "Neutral price, depends on urgency";
}
