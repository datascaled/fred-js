/**
 * Clamps a value to >=min and <=max.
 *
 * @param value The value to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Clamps a value to >=0 and <=1.
 *
 * @param value The value to clamp.
 * @returns The clamped value.
 */
export function clamp01(value: number) {
    return clamp(value, 0, 1);
}
