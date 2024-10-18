import { Word } from '@models/word.model';
import { shuffle } from '@utils/array.util';

export function findRandomWords(
  words: Word[],
  nbWords: number,
  wordsIdsToAvoid: number[] = []
): Word[] {
  const wordIds = new Set<number>();

  // Pick random words from the ones not avoided
  const wordsWanted = words.filter((w) => !wordsIdsToAvoid.includes(w.id));
  const maxSizeWished = Math.min(wordsWanted.length, Math.round(nbWords / 2));
  while (wordIds.size < maxSizeWished) {
    wordIds.add(wordsWanted[Math.floor(Math.random() * wordsWanted.length)].id);
  }

  // Pick random words from all words
  const maxSize = Math.min(words.length, nbWords);
  while (wordIds.size < maxSize) {
    wordIds.add(words[Math.floor(Math.random() * words.length)].id);
  }

  return shuffle(words.filter((w) => wordIds.has(w.id)));
}

export function buildWords(data: string): Word[] {
  return decode(data)
    .split('\n')
    .filter((line) => !!line)
    .map((line, id) => {
      const [es, fr] = line.split(' : ');
      return {
        id,
        es,
        fr,
      };
    });
}

function decode(str: string) {
  const base64Prefix = 'data:text/plain;base64,';

  if (str.startsWith(base64Prefix)) {
    return atob(str.substring(base64Prefix.length));
  }
  return str;
}
