import type { Vec2D } from '@lou/math/vec2d';

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Create a new zeroed rectangle.
 *
 * @returns A new rectangle.
 */
export function create(init?: Partial<Rect>): Rect {
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    ...init,
  };
}

/**
 * Create a new rectangle with the size of the viewport.
 *
 * @returns A new rectangle.
 */
export function viewport(init?: Partial<Rect>): Rect {
  return {
    x: 0,
    y: 0,
    width: globalThis.innerWidth,
    height: globalThis.innerHeight,
    ...init,
  };
}

/**
 * Create a new rectangle from an element.
 *
 * @param element The element to create the rectangle from.
 * @returns A new rectangle.
 */
export function fromElement(element: HTMLElement): Rect {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Check if two rectangles are equal.
 *
 * @param rect1 The first rectangle.
 * @param rect2 The second rectangle.
 * @returns Whether the rectangles are equal.
 */
export function equals(rect1: Rect, rect2: Rect): boolean {
  return (
    rect1.x === rect2.x &&
    rect1.y === rect2.y &&
    rect1.width === rect2.width &&
    rect1.height === rect2.height
  );
}

/**
 * Copies the values of one rectangle into another, without creating a new Rect.
 *
 * @param rect The rectangle to copy from.
 * @param target The rectangle to copy into.
 * @returns The target rectangle.
 */
export function copyInto(rect: Rect, target: Rect): Rect {
  target.x = rect.x;
  target.y = rect.y;
  target.width = rect.width;
  target.height = rect.height;
  return target;
}

/**
 * Clone a rectangle.
 *
 * @param rect The rectangle to clone.
 * @returns A new rectangle.
 */
export function clone(rect: Rect): Rect {
  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Rounds all values of a rectangle.
 *
 * @param rect The rectangle.
 * @returns A new rectangle.
 */
export function round(rect: Rect): Rect {
  return {
    x: Math.round(rect.x),
    y: Math.round(rect.y),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  };
}

/**
 * Insets for a rectangle.
 */
export type Insets =
  | Partial<{ top: number; left: number; right: number; bottom: number }>
  | Partial<{ x: number; y: number }>;

/**
 * Inset a rectangle.
 *
 * @param rect The rectangle.
 * @returns A new rectangle.
 */
export function inset(rect: Rect, insets: number | Insets): Rect {
  let top = 0;
  let left = 0;
  let right = 0;
  let bottom = 0;

  if (typeof insets === 'number') {
    // Uniform inset on all sides
    top = insets;
    left = insets;
    right = insets;
    bottom = insets;
  } else if ('x' in insets || 'y' in insets) {
    // Uniform inset on x and y
    top = insets.y ?? 0;
    left = insets.x ?? 0;
    right = insets.x ?? 0;
    bottom = insets.y ?? 0;
  } else if (
    'top' in insets || 'left' in insets || 'right' in insets ||
    'bottom' in insets
  ) {
    // Individual insets with defaults
    top = insets.top ?? 0;
    left = insets.left ?? 0;
    right = insets.right ?? 0;
    bottom = insets.bottom ?? 0;
  }

  return {
    x: rect.x + left,
    y: rect.y + top,
    width: rect.width - left - right,
    height: rect.height - top - bottom,
  };
}

/**
 * Clip a rectangle to another rectangle.
 *
 * @param rect The rectangle.
 * @param clipRect The rectangle to clip to.
 * @returns A new rectangle.
 */
export function clip(rect: Rect, clipRect: Rect): Rect {
  const x = Math.max(rect.x, clipRect.x);
  const y = Math.max(rect.y, clipRect.y);
  const width = Math.min(right(rect), right(clipRect) - x);
  const height = Math.min(bottom(rect), bottom(clipRect) - y);

  return {
    x,
    y,
    width,
    height,
  };
}

/**
 * Get the top of a rectangle.
 *
 * @param rect The rectangle.
 * @returns The top of the rectangle (y).
 */
export function top(rect: Rect): number {
  return rect.y;
}

/**
 * Get the left of a rectangle.
 *
 * @param rect The rectangle.
 * @returns The left of the rectangle (x).
 */
export function left(rect: Rect): number {
  return rect.x;
}

/**
 * Get the right of a rectangle.
 *
 * @param rect The rectangle.
 * @returns The right of the rectangle (x + width).
 */
export function right(rect: Rect): number {
  return rect.x + rect.width;
}

/**
 * Get the bottom of a rectangle.
 *
 * @param rect The rectangle.
 * @returns The bottom of the rectangle (y + height).
 */
export function bottom(rect: Rect): number {
  return rect.y + rect.height;
}

/**
 * Get the center of a rectangle.
 *
 * @param rect The rectangle.
 * @returns The center of the rectangle.
 */
export function center(rect: Rect): Vec2D {
  return {
    x: centerX(rect),
    y: centerY(rect),
  };
}

/**
 * Get the horizontal center of a rectangle.
 *
 * @param rect The rectangle.
 * @returns The horizontal center of the rectangle.
 */
export function centerX(rect: Rect): number {
  return rect.x + rect.width * 0.5;
}

/**
 * Get the vertical center of a rectangle.
 *
 * @param rect The rectangle.
 * @returns The vertical center of the rectangle.
 */
export function centerY(rect: Rect): number {
  return rect.y + rect.height * 0.5;
}

/**
 * Calculates the area of a rectangle.
 *
 * @param rect The rectangle.
 * @returns The area of the rectangle.
 */
export function area(rect: Rect): number {
  return rect.width * rect.height;
}

/**
 * Calculates the perimeter of a rectangle.
 *
 * @param rect The rectangle.
 * @returns The perimeter of the rectangle.
 */
export function perimeter(rect: Rect): number {
  return 2 * (rect.width + rect.height);
}

/**
 * Check whether a point is inside a rectangle.
 *
 * @param rect The rectangle.
 * @returns Whether the point is inside the rectangle.
 */
export function isPointInside(point: Vec2D, rect: Rect): boolean {
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
 * @returns Whether the rectangle fits inside the other rectangle.
 */
export function isInsideOther(rect: Rect, other: Rect): boolean {
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
