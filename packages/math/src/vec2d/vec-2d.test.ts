import { expect } from '@std/expect';
import { describe, test } from '@std/testing/bdd';
import * as v from './vec-2d.ts';

describe('Vec2D', () => {
  test('add(a, b)', () => {
    const a: v.Vec2D = { x: 1, y: 2 };
    const b: v.Vec2D = { x: 3, y: 4 };

    expect(v.add(a, b)).toStrictEqual({
      x: 4,
      y: 6,
    });
  });

  test('subtract(a, b)', () => {
    const a: v.Vec2D = { x: 1, y: 2 };
    const b: v.Vec2D = { x: 3, y: 4 };

    expect(v.subtract(a, b)).toStrictEqual({
      x: -2,
      y: -2,
    });
  });

  test('scale(v, s)', () => {
    const vec: v.Vec2D = { x: 1, y: 2 };

    expect(v.scale(vec, 2)).toStrictEqual({
      x: 2,
      y: 4,
    });
  });

  test('length(v)', () => {
    const vec: v.Vec2D = { x: 3, y: 4 };

    expect(v.length(vec)).toBe(5);
  });

  test('normalize(v)', () => {
    const vec: v.Vec2D = { x: 3, y: 4 };

    expect(v.normalize(vec)).toStrictEqual({
      x: 0.6,
      y: 0.8,
    });
  });

  test('dot(a, b)', () => {
    const a: v.Vec2D = { x: 1, y: 2 };
    const b: v.Vec2D = { x: 3, y: 4 };

    expect(v.dot(a, b)).toBe(11);
  });

  test('cross(a, b)', () => {
    const a: v.Vec2D = { x: 1, y: 2 };
    const b: v.Vec2D = { x: 3, y: 4 };

    expect(v.cross(a, b)).toBe(-2);
  });

  test('angle(a, b)', () => {
    const a: v.Vec2D = { x: 1, y: 0 };
    const b: v.Vec2D = { x: 0, y: 1 };

    expect(v.angle(a, b)).toBe(Math.PI / 2);
  });

  test('rotate(v, angle)', () => {
    const vec: v.Vec2D = { x: 1, y: 0 };

    expect(v.rotate(vec, Math.PI / 2)).toStrictEqual({
      x: 0,
      y: 1,
    });
  });

  test('lerp(t, a, b)', () => {
    const a: v.Vec2D = { x: 1, y: 2 };
    const b: v.Vec2D = { x: 3, y: 4 };

    expect(v.lerp(0.5, a, b)).toStrictEqual({
      x: 2,
      y: 3,
    });
  });

  test('distance(a, b)', () => {
    const a: v.Vec2D = { x: 1, y: 2 };
    const b: v.Vec2D = { x: 4, y: 6 };

    expect(v.distance(a, b)).toBe(5);
  });

  test('equal(a, b)', () => {
    const a: v.Vec2D = { x: 1, y: 2 };
    const b: v.Vec2D = { x: 1, y: 2 };

    expect(v.equal(a, b)).toBe(true);
  });

  test('up()', () => {
    expect(v.up()).toStrictEqual({
      x: 0,
      y: 1,
    });
  });

  test('down()', () => {
    expect(v.down()).toStrictEqual({
      x: 0,
      y: -1,
    });
  });

  test('left()', () => {
    expect(v.left()).toStrictEqual({
      x: -1,
      y: 0,
    });
  });

  test('right()', () => {
    expect(v.right()).toStrictEqual({
      x: 1,
      y: 0,
    });
  });
});
