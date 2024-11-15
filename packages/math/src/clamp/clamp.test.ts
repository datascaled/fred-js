import { expect } from '@std/expect';
import { describe, it } from '@std/testing/bdd';
import { clamp, clamp01 } from './clamp.ts';

describe('clamp(value, a, b)', () => {
  it('should return 0', () => {
    expect(clamp(0, 0, 1)).toBe(0);
  });

  it('should return 1', () => {
    expect(clamp(1, 0, 1)).toBe(1);
  });

  it('should return 0.5', () => {
    expect(clamp(0.5, 0, 1)).toBe(0.5);
  });

  it('should clamp to min', () => {
    expect(clamp(-1, 0, 100)).toBe(0);
  });

  it('should clamp to max', () => {
    expect(clamp(101, 0, 100)).toBe(100);
  });
});

describe('clamp01(value)', () => {
  it('should return 0', () => {
    expect(clamp01(0)).toBe(0);
  });

  it('should return 1', () => {
    expect(clamp01(1)).toBe(1);
  });

  it('should return 0.5', () => {
    expect(clamp01(0.5)).toBe(0.5);
  });

  it('should clamp to 0', () => {
    expect(clamp01(-1)).toBe(0);
  });

  it('should clamp to 1', () => {
    expect(clamp01(101)).toBe(1);
  });
});
