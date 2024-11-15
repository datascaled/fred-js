import { expect } from '@std/expect';
import { describe, it } from '@std/testing/bdd';
import { clampedRemap, remap } from './remap.ts';

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

  it('should return beyond 100', () => {
    expect(remap(2, 0, 1, 0, 100)).toBe(200);
  });

  it('should return below 0', () => {
    expect(remap(-1, 0, 1, 0, 100)).toBe(-100);
  });
});

describe('clampedRemap(value, srcA, srcB, destA, destB)', () => {
  it('should return 0', () => {
    expect(clampedRemap(0, 0, 1, 0, 1)).toBe(0);
  });

  it('should return 1', () => {
    expect(clampedRemap(1, 0, 1, 0, 1)).toBe(1);
  });

  it('should return 0.5', () => {
    expect(clampedRemap(0.5, 0, 1, 0, 1)).toBe(0.5);
  });

  it('should return -1', () => {
    expect(clampedRemap(-1, 0, -1, 0, -1)).toBe(-1);
  });

  it('should return 50', () => {
    expect(clampedRemap(50, 0, 100, 0, 1)).toBe(0.5);
  });

  it('should not return beyond 100', () => {
    expect(clampedRemap(2, 0, 1, 0, 100)).toBe(100);
  });

  it('should not return below 0', () => {
    expect(clampedRemap(-1, 0, 1, 0, 100)).toBe(0);
  });
});
