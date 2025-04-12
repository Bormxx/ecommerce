export function averageRatingFunc(numbers: number[]): number {
  return numbers.length > 0
    ? numbers.reduce((sum, num) => sum + num, 0) / numbers.length
    : 0;
}
