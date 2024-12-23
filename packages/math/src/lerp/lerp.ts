import { clamp01 } from '@fred/math';

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
  return t * (b - a) + a;
}

/**
 * Linearly interpolates between two values, clamping the result between a and b.
 *
 * @param t The interpolation factor. Usually between 0 and 1.
 * @param a The start value.
 * @param b The end value.
 *
 * @returns The clamped interpolated value.
 */
export function clampedLerp(t: number, a: number, b: number): number {
  return lerp(clamp01(t), a, b);
}
