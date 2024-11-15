import { invLerp } from './inv-lerp.ts';
import { lerp } from './lerp.ts';

/**
 * Remaps a value from one range to another.
 *
 * @param value The value to remap.
 * @param srcA The start of the source range.
 * @param srcB The end of the source range.
 * @param destA The start of the destination range.
 * @param destB The end of the destination range.
 *
 * @returns The value remapped to the destination range.
 */
export function remap(
  value: number,
  srcA: number,
  srcB: number,
  destA: number,
  destB: number,
): number {
  return lerp(invLerp(value, srcA, srcB), destA, destB);
}
