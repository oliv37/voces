import { WordsCategory, Word, WordsGroup } from '../models/word.model';
import dataLevel1 from '@data/level1.txt';
import dataLevel2 from '@data/level2.txt';
import dataLevel3 from '@data/level3.txt';
import { shuffle } from '@shared/utils/array.util';

const WORDS_GROUP_SIZE = 40;

export const WORDS_CATEGORIES = [
  buildWordsCategory('LEVEL1', 'Niveau 1', 'niveau1', dataToWords(dataLevel1)),
  buildWordsCategory('LEVEL2', 'Niveau 2', 'niveau2', dataToWords(dataLevel2)),
  buildWordsCategory('LEVEL3', 'Niveau 3', 'niveau3', dataToWords(dataLevel3)),
] as const;

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

  return shuffle(words.filter((w) => wordIds.has(w.id)));
}

export function findWordsCategory(
  wordsCategoryPathParam: string | null
): WordsCategory | undefined {
  return WORDS_CATEGORIES.find(
    ({ pathParam }) => pathParam === wordsCategoryPathParam
  );
}

export function findWordsGroup(
  wordsCategoryPathParam: string | null,
  wordsGroupPathParam: string | null
) {
  return findWordsCategory(wordsCategoryPathParam)?.wordsGroups.find(
    ({ pathParam }) => pathParam === wordsGroupPathParam
  );
}

function buildWordsCategory(
  id: string,
  label: string,
  pathParam: string,
  words: Word[]
): WordsCategory {
  return {
    id,
    label,
    pathParam,
    nbWords: words.length,
    wordsGroups: toWordsGroups(id, words),
  };
}

function toWordsGroups(wordsCategoryId: string, words: Word[]): WordsGroup[] {
  const nbWords = words.length;
  const nbWordsGroup = Math.ceil(nbWords / WORDS_GROUP_SIZE);
  return [...Array(nbWordsGroup).keys()].map((i) => {
    const start = i * WORDS_GROUP_SIZE;
    const end = Math.min(start + WORDS_GROUP_SIZE, nbWords);
    const index = i + 1;
    return {
      id: `${wordsCategoryId}_${index}`,
      pathParam: `${index}`,
      words: words.slice(start, end),
    };
  });
}

function dataToWords(data: string): Word[] {
  return decode(data)
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
}

function decode(str: string) {
  const base64Prefix = 'data:text/plain;base64,';

  if (str.startsWith(base64Prefix)) {
    return atob(str.substring(base64Prefix.length));
  }
  return str;
}
