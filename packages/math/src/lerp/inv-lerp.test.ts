import { expect } from '@std/expect';
import { describe, it } from '@std/testing/bdd';
import { clampedInvLerp, invLerp } from './inv-lerp.ts';

describe('invLerp(value, a, b)', () => {
  it('should return 0', () => {
    expect(invLerp(0, 0, 1)).toBe(0);
  });

  it('should return 1', () => {
    expect(invLerp(1, 0, 1)).toBe(1);
  });

  it('should return 0.5', () => {
    expect(invLerp(0.5, 0, 1)).toBe(0.5);
  });

  it('should return 1', () => {
    expect(invLerp(-1, 0, -1)).toBe(1);
  });

  it('should return 0.5', () => {
    expect(invLerp(50, 0, 100)).toBe(0.5);
  });

  it('should return beyond 1', () => {
    expect(invLerp(2, 0, 1)).toBe(2);
  });

  it('should return below 0', () => {
    expect(invLerp(-1, 0, 1)).toBe(-1);
  });
});

describe('clampedInvLerp(value, a, b)', () => {
  it('should return 0', () => {
    expect(clampedInvLerp(0, 0, 1)).toBe(0);
  });

  it('should return 1', () => {
    expect(clampedInvLerp(1, 0, 1)).toBe(1);
  });

  it('should return 0.5', () => {
    expect(clampedInvLerp(0.5, 0, 1)).toBe(0.5);
  });

  it('should return 1', () => {
    expect(clampedInvLerp(-1, 0, -1)).toBe(1);
  });

  it('should return 0.5', () => {
    expect(clampedInvLerp(50, 0, 100)).toBe(0.5);
  });

  it('should not return beyond 1', () => {
    expect(clampedInvLerp(2, 0, 1)).toBe(1);
  });

  it('should not return below 0', () => {
    expect(clampedInvLerp(-1, 0, 1)).toBe(0);
  });
});
