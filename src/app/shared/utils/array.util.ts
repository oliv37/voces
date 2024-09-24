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

export function getNextElems<T>(elems?: T[], elem?: T): T[] | [] {
  if (!elems || !elem) {
    return [];
  }

  const nbElems = elems.length;
  const elemIdx = elems.indexOf(elem);
  const startIdx = elemIdx !== -1 ? elemIdx : 0;
  const nextElems: T[] = [];

  for (let i = 0; i < nbElems; i++) {
    const nextElem = elems[(startIdx + i) % nbElems];
    if (nextElem && nextElem != elem) {
      nextElems.push(nextElem);
    }
  }

  return nextElems;
}
