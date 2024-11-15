import type { Vec2D } from '@crux/math/vec2d';

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Calculates the area of a rectangle.
 *
 * @param rect The rectangle.
 *
 * @returns The area of the rectangle.
 */
export function area(rect: Rect): number {
  return rect.width * rect.height;
}

/**
 * Get the top of a rectangle.
 *
 * @param rect The rectangle.
 *
 * @returns The top of the rectangle (y).
 */
export function top(rect: Rect): number {
  return rect.y;
}

/**
 * Get the left of a rectangle.
 *
 * @param rect The rectangle.
 *
 * @returns The left of the rectangle (x).
 */
export function left(rect: Rect): number {
  return rect.x;
}

/**
 * Get the right of a rectangle.
 *
 * @param rect The rectangle.
 *
 * @returns The right of the rectangle (x + width).
 */
export function right(rect: Rect): number {
  return rect.x + rect.width;
}

/**
 * Get the bottom of a rectangle.
 *
 * @param rect The rectangle.
 *
 * @returns The bottom of the rectangle (y + height).
 */
export function bottom(rect: Rect): number {
  return rect.y + rect.height;
}

/**
 * Check whether a point is inside a rectangle.
 *
 * @param rect The rectangle.
 *
 * @returns Whether the point is inside the rectangle.
 */
export function pointInside(rect: Rect, point: Vec2D): boolean {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
}

/**
 * Check whether a rectangle fits completely inside another rectangle.
 *
 * @param rect The rectangle.
 * @param other The other rectangle.
 *
 * @returns Whether the rectangle fits inside the other rectangle.
 */
export function contains(rect: Rect, other: Rect): boolean {
  return (
    left(rect) <= left(other) &&
    top(rect) <= top(other) &&
    right(rect) >= right(other) &&
    bottom(rect) >= bottom(other)
  );
}

/**
 * Check whether two rectangles intersect.
 *
 * @param rect The rectangle.
 * @param other The other rectangle.
 *
 * @returns Whether the rectangles intersect.
 */
export function intersects(rect: Rect, other: Rect): boolean {
  return (
    left(rect) < right(other) &&
    right(rect) > left(other) &&
    top(rect) < bottom(other) &&
    bottom(rect) > top(other)
  );
}
