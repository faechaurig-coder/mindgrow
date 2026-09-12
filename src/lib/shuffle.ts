export function seededShuffle<T>(list: T[], seed: number): T[] {
  const next = [...list];
  let s = seed + 17;
  for (let i = next.length - 1; i > 0; i -= 1) {
    s = (s * 9301 + 49297) % 233280;
    const j = s % (i + 1);
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}
