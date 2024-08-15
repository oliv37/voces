import { Word, WordsGroup } from '../models/word.model';
import data from '@data/es.txt';

const WORDS_GROUP_SIZE = 50;

export const ALL_WORDS: Word[] = data
  .split('\n')
  .filter((line) => !!line)
  .map((line, id) => {
    const [value, translationFr] = line.split(' : ');
    return {
      id,
      value,
      translationFr,
    };
  });

export function findWordsGroupList(): WordsGroup[] {
  const nbWords = ALL_WORDS.length;
  const nbWordsGroup = Math.ceil(nbWords / WORDS_GROUP_SIZE);
  return [...Array(nbWordsGroup).keys()].map((i) => {
    const start = i * WORDS_GROUP_SIZE;
    const end = Math.min(start + WORDS_GROUP_SIZE, ALL_WORDS.length);
    return { id: i + 1, words: ALL_WORDS.slice(start, end) };
  });
}

export function findWordsGroup(wordsGroupId: number): WordsGroup {
  const start = (wordsGroupId - 1) * WORDS_GROUP_SIZE;
  const end = Math.min(start + WORDS_GROUP_SIZE, ALL_WORDS.length);
  return {
    id: wordsGroupId,
    words: ALL_WORDS.slice(start, end),
  };
}

export function findRandomWords(
  words: Word[],
  nbWords: number,
  wordsIdsToAvoid: number[] = []
): Word[] {
  const wordIds = new Set<number>();

  // Pick random words from the ones not avoided
  const wordsWished = words.filter((w) => !wordsIdsToAvoid.includes(w.id));
  const maxSizeWished = Math.min(wordsWished.length, Math.round(nbWords / 2));
  while (wordIds.size < maxSizeWished) {
    wordIds.add(wordsWished[Math.floor(Math.random() * wordsWished.length)].id);
  }

  // Pick random words from all words
  const maxSize = Math.min(words.length, nbWords);
  while (wordIds.size < maxSize) {
    wordIds.add(words[Math.floor(Math.random() * words.length)].id);
  }

  return words.filter((w) => wordIds.has(w.id));
}
