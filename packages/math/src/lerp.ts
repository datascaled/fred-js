/**
 * Linearly interpolates between two values.
 *
 * @param t The interpolation factor. Usually between 0 and 1.
 * @param a The start value.
 * @param b The end value.
 *
 * @returns The interpolated value.
 */
export function lerp(t: number, a: number, b: number): number {
  return a + (b - a) * t;
}
