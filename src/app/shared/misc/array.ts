export function shuffle<T>(arr: T[]): T[] {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

export function pickNRandomElems<T>(arr: T[], n: number): T[] {
  const maxLength = Math.min(n, arr.length);
  let result: T[] = [];

  while (result.length < maxLength) {
    const elem = arr[Math.floor(Math.random() * arr.length)];
    result = addIfNotPresent(result, elem);
  }

  return shuffle(result);
}

export function addIfNotPresent<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr : [...arr, item];
}
