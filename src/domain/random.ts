/** A function returning a float in [0, 1). */
export type Rng = () => number;

/**
 * mulberry32: tiny, fast, seedable PRNG. Good enough for shuffling quiz
 * questions and fully deterministic for tests.
 */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 0x7fffffff);
}

/** Fisher–Yates shuffle returning a new array. */
export function shuffle<T>(items: readonly T[], rng: Rng): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Pick up to `n` distinct items at random. */
export function sample<T>(items: readonly T[], n: number, rng: Rng): T[] {
  if (n >= items.length) {
    return shuffle(items, rng);
  }
  return shuffle(items, rng).slice(0, Math.max(0, n));
}
