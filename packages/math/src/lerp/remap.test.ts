import { expect } from '@std/expect';
import { describe, it } from '@std/testing/bdd';
import { remap } from './remap.ts';

describe('remap(value, srcA, srcB, destA, destB)', () => {
  it('should return 0', () => {
    expect(remap(0, 0, 1, 0, 1)).toBe(0);
  });

  it('should return 1', () => {
    expect(remap(1, 0, 1, 0, 1)).toBe(1);
  });

  it('should return 0.5', () => {
    expect(remap(0.5, 0, 1, 0, 1)).toBe(0.5);
  });

  it('should return -1', () => {
    expect(remap(-1, 0, -1, 0, -1)).toBe(-1);
  });

  it('should return 50', () => {
    expect(remap(50, 0, 100, 0, 1)).toBe(0.5);
  });
});
