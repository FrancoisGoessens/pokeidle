const SUFFIXES = [
  'k',
  'm',
  'b',
  't',
  'aa',
  'ab',
  'ac',
  'ad',
  'ae',
  'af',
  'ag',
  'ah',
  'ai',
  'aj',
  'ak',
]

export function formatNumber(n: number): string {
  if (n < 1000) {
    return Math.floor(n).toString()
  }

  let index = -1
  let value = n

  while (value >= 1000 && index < SUFFIXES.length - 1) {
    value /= 1000
    index++
  }

  return `${Math.floor(value * 10) / 10}${SUFFIXES[index]}`
}
