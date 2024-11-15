import { clamp01 } from '@lou/math';

/**
 * Returns the linear interpolation of a value between two numbers.
 *
 * @param value The value to interpolate.
 * @param a The start of the range.
 * @param b The end of the range.
 *
 * @returns The linear interpolation of value between a and b.
 */
export function invLerp(value: number, a: number, b: number): number {
  return (value - a) / (b - a);
}

/**
 * Returns the linear interpolation of a value between two numbers, clamped between 0 and 1.
 *
 * @param value The value to interpolate.
 * @param a The start of the range.
 * @param b The end of the range.
 *
 * @returns The linear interpolation of value between a and b.
 */
export function clampedInvLerp(value: number, a: number, b: number): number {
  return clamp01(invLerp(value, a, b));
}
