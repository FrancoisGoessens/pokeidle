export function getCost(n: number, baseCost: number = 100): number {
  let cost = baseCost
  for (let i = 0; i < n; i++) {
    const multiplier = Math.max(1.8, 2 - i * 0.1)
    cost *= multiplier
  }
  return Math.floor(cost)
}