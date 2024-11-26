export function second(value: number): number {
  return value * 1000
}

export function minute(value: number): number {
  return value * second(60)
}

export function hour(value: number): number {
  return value * minute(60)
}

export function day(value: number): number {
  return value * hour(24)
}
