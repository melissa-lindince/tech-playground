export function calculatePercentage(numerator: number, denominator: number): number {
  if (denominator === 0 || denominator === null) return 0;
  return (numerator / denominator) * 100;
}

export function roundToTwoDecimals(value: any): number {
  if (value === null || value === undefined) {
    return 0;
  }
  return Math.round(value * 100) / 100;
}
