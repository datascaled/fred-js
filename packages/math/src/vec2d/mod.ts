/**
 * This module contains function related to 2D vectors.
 * @module
 *
 * @example
 * ```ts
 * import * as vec2d from '@fred/math/vec2d';
 *
 * const a = vec2d.create();
 * const b = vec2d.clone(a);
 *
 * console.log(vec2d.equals(a, b)); // true
 *
 * b.x = 1;
 * b.y = 1;
 *
 * console.log(vec2d.add(a, b)); // { x: 1, y: 1 }
 *
 * ```
 */
export * from './vec-2d.ts';
