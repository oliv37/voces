export function shuffle<T>(arr: T[]): T[] {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

export function groupBy<T, K extends string>(
  arr: T[],
  toKey: (t: T) => K
): Partial<Record<K, T[]>> {
  return arr.reduce((res, elem) => {
    const key = toKey(elem);
    res[key] = [...(res[key] ?? []), elem];
    return res;
  }, {} as Partial<Record<K, T[]>>);
}
