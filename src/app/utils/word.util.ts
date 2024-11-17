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
