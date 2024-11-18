/**
 * This module contains function related to rectangles.
 * @module
 *
 * @example
 * ```ts
 * import * as rect from '@fred/math/rect';
 *
 * const rect = rect.create({ x: 10, width: 100 });
 * const elementRect = rect.fromElement(document.querySelector('#my-element'));
 * const viewport = rect.viewport();
 *
 * console.log(rect.isInside(rect, viewport); // true
 * ```
 */
export * from './rect.ts';
