/**
 * @param t - The time value between 0 and 1.
 * @returns The eased time value.
 */
export type EasingFunction = (t: number) => number;

/**
 * Linear easing function.
 *
 * @param t - The time value between 0 and 1.
 * @returns The eased time value.
 */
export const linear: EasingFunction = (t) => t;
