import { expect } from '@std/expect';
import { describe, it } from '@std/testing/bdd';
import { round, roundPrecision } from './round.ts';

describe('round', () => {
  it('round(n)', () => {
    expect(round(0.2345)).toBe(0);
    expect(round(0.5)).toBe(1);
    expect(round(1.2345)).toBe(1);
    expect(round(1.5)).toBe(2);
    expect(round(1.49)).toBe(1);
    expect(round(11.11111)).toBe(11);
  });
});

describe('roundPrecision', () => {
  it('roundPrecision(n, p)', () => {
    expect(roundPrecision(1.2345, 0)).toBe(1);
    expect(roundPrecision(1.2345, 1)).toBe(1.2);
    expect(roundPrecision(1.2345, 2)).toBe(1.23);
    expect(roundPrecision(1.2345, 3)).toBe(1.235);
  });
});
