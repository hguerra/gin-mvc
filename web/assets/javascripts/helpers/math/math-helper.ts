import { Sum } from './operations/sum'

function sum(a: number, b: number): number {
  return Sum.perform(a, b)
}

export const MathHelper = {
  sum,
}
