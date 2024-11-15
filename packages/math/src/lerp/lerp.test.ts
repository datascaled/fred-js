import { expect } from '@std/expect';
import { describe, it } from '@std/testing/bdd';
import { lerp } from './lerp.ts';

describe('lerp(t, a, b)', () => {
  it('should return 0', () => {
    expect(lerp(0, 0, 1)).toBe(0);
  });

  it('should return 1', () => {
    expect(lerp(1, 0, 1)).toBe(1);
  });

  it('should return 0.5', () => {
    expect(lerp(0.5, 0, 1)).toBe(0.5);
  });

  it('should return -1', () => {
    expect(lerp(1, 0, -1)).toBe(-1);
  });

  it('should return 50', () => {
    expect(lerp(0.5, 0, 100)).toBe(50);
  });
});
