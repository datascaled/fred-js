/**
 * Round a number to the nearest integer.
 *
 * @param value - The number to round.
 *
 * @returns The rounded number.
 */
export function round(value: number): number {
  return Math.round(value);
}

/**
 * Round a number to a specific precision.
 *
 * @param value - The number to round.
 * @param precision - The number of decimal places to round to.
 *
 * @returns The rounded number.
 */
export function roundPrecision(value: number, precision: number): number {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}
