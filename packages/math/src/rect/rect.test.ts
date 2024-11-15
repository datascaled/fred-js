import { expect } from '@std/expect';
import { describe, test } from '@std/testing/bdd';
import * as r from './rect.ts';

describe('Rect', () => {
  test('area(r)', () => {
    const rect: r.Rect = { x: 0, y: 0, width: 10, height: 10 };

    expect(r.area(rect)).toBe(100);
  });

  test('top(r)', () => {
    const rect: r.Rect = { x: 0, y: 10, width: 10, height: 10 };

    expect(r.top(rect)).toBe(10);
  });

  test('left(r)', () => {
    const rect: r.Rect = { x: 10, y: 0, width: 10, height: 10 };

    expect(r.left(rect)).toBe(10);
  });

  test('right(r)', () => {
    const rect: r.Rect = { x: 0, y: 0, width: 10, height: 10 };

    expect(r.right(rect)).toBe(10);
  });

  test('bottom(r)', () => {
    const rect: r.Rect = { x: 0, y: 0, width: 10, height: 10 };

    expect(r.bottom(rect)).toBe(10);
  });

  test('isInside(r, p)', () => {
    const rect: r.Rect = { x: 0, y: 0, width: 10, height: 10 };
    const point = { x: 5, y: 5 };

    expect(r.isPointInside(point, rect)).toBe(true);
  });

  test('contains(r, o)', () => {
    const rect: r.Rect = { x: 0, y: 0, width: 10, height: 10 };
    const other: r.Rect = { x: 0, y: 0, width: 5, height: 5 };

    expect(r.isInsideOther(rect, other)).toBe(true);
  });

  test('intersects(r, o)', () => {
    const rect: r.Rect = { x: 0, y: 0, width: 10, height: 10 };
    const other: r.Rect = { x: 5, y: 5, width: 10, height: 10 };

    expect(r.intersects(rect, other)).toBe(true);
  });
});
