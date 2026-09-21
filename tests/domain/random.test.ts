import { describe, expect, it } from 'vitest';
import { mulberry32, randomSeed, sample, shuffle } from '../../src/domain/random';

describe('random', () => {
  it('is deterministic for the same seed', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    const seqA = Array.from({ length: 5 }, () => a());
    const seqB = Array.from({ length: 5 }, () => b());
    expect(seqA).toEqual(seqB);
    for (const value of seqA) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it('differs for different seeds', () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });

  it('shuffle returns a permutation without mutating the input', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8];
    const output = shuffle(input, mulberry32(7));
    expect(input).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect([...output].sort((x, y) => x - y)).toEqual(input);
    expect(output).not.toEqual(input);
  });

  it('sample picks n distinct items and caps at the array length', () => {
    const input = ['a', 'b', 'c', 'd'];
    const picked = sample(input, 2, mulberry32(3));
    expect(picked).toHaveLength(2);
    expect(new Set(picked).size).toBe(2);
    expect(sample(input, 10, mulberry32(3))).toHaveLength(4);
    expect(sample(input, 0, mulberry32(3))).toHaveLength(0);
  });

  it('randomSeed returns a non-negative 31-bit integer', () => {
    const seed = randomSeed();
    expect(Number.isInteger(seed)).toBe(true);
    expect(seed).toBeGreaterThanOrEqual(0);
    expect(seed).toBeLessThan(0x80000000);
  });
});
