import { roundPrecision } from '@lou/math';

/**
 * A cartesian 2D vector.
 */
export interface Vec2D {
  x: number;
  y: number;
}

/**
 * Adds two vectors.
 *
 * @param a The first vector.
 * @param b The second vector.
 *
 * @returns The sum of the two vectors.
 */
export function add(a: Vec2D, b: Vec2D): Vec2D {
  return { x: a.x + b.x, y: a.y + b.y };
}

/**
 * Subtracts two vectors.
 *
 * @param a The first vector.
 * @param b The second vector.
 *
 * @returns The difference of the two vectors.
 */
export function subtract(a: Vec2D, b: Vec2D): Vec2D {
  return { x: a.x - b.x, y: a.y - b.y };
}

/**
 * Scales a vector by a scalar.
 *
 * @param v The vector.
 * @param s The scalar.
 *
 * @returns The scaled vector.
 */
export function scale(v: Vec2D, s: number): Vec2D {
  return { x: v.x * s, y: v.y * s };
}

/**
 * Calculates the length of a vector.
 *
 * @param v The vector.
 *
 * @returns The length of the vector.
 */
export function length(v: Vec2D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

/**
 * Normalizes a vector.
 *
 * @param v The vector.
 *
 * @returns The normalized vector.
 */
export function normalize(v: Vec2D): Vec2D {
  const l = length(v);
  return { x: v.x / l, y: v.y / l };
}

/**
 * Calculates the dot product of two vectors.
 *
 * @param a The first vector.
 * @param b The second vector.
 *
 * @returns The dot product of the two vectors.
 */
export function dot(a: Vec2D, b: Vec2D): number {
  return a.x * b.x + a.y * b.y;
}

/**
 * Calculates the cross product of two vectors.
 *
 * @param a The first vector.
 * @param b The second vector.
 *
 * @returns The cross product of the two vectors.
 */
export function cross(a: Vec2D, b: Vec2D): number {
  return a.x * b.y - a.y * b.x;
}

/**
 * Calculates the angle between two vectors.
 *
 * @param a The first vector.
 * @param b The second vector.
 *
 * @returns The angle between the two vectors in radians.
 */
export function angle(a: Vec2D, b: Vec2D): number {
  return Math.acos(dot(a, b) / (length(a) * length(b)));
}

/**
 * Rotates a vector by an angle.
 *
 * @param v The vector.
 * @param angle The angle to rotate by in radians.
 *
 * @returns The rotated vector.
 */
export function rotate(v: Vec2D, angle: number): Vec2D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: roundPrecision(v.x * cos - v.y * sin, 10),
    y: roundPrecision(v.x * sin + v.y * cos, 10),
  };
}

/**
 * Linearly interpolates between two vectors.
 *
 * @param t The interpolation factor. Usually between 0 and 1.
 * @param a The start vector.
 * @param b The end vector.
 *
 * @returns The interpolated vector.
 */
export function lerp(t: number, a: Vec2D, b: Vec2D): Vec2D {
  return add(scale(a, 1 - t), scale(b, t));
}

/**
 * Calculates the distance between two vectors.
 *
 * @param a The first vector.
 * @param b The second vector.
 *
 * @returns The distance between the two vectors.
 */
export function distance(a: Vec2D, b: Vec2D): number {
  return length(subtract(a, b));
}

/**
 * Checks if two vectors are equal.
 *
 * @param a The first vector.
 * @param b The second vector.
 *
 * @returns True if the vectors are equal, false otherwise.
 */
export function equal(a: Vec2D, b: Vec2D): boolean {
  return a.x === b.x && a.y === b.y;
}

/**
 * Creates a vector pointing up.
 *
 * @returns A vector pointing up.
 */
export function up(): Vec2D {
  return { x: 0, y: 1 };
}

/**
 * Creates a vector pointing down.
 *
 * @returns A vector pointing down.
 */
export function down(): Vec2D {
  return { x: 0, y: -1 };
}

/**
 * Creates a vector pointing left.
 *
 * @returns A vector pointing left.
 */
export function left(): Vec2D {
  return { x: -1, y: 0 };
}

/**
 * Creates a vector pointing right.
 *
 * @returns A vector pointing right.
 */
export function right(): Vec2D {
  return { x: 1, y: 0 };
}
