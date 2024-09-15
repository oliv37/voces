import { WordsCategory, Word, WordsGroup } from '../models/word.model';
import dataLevel1a from '@data/level1a.txt';
import dataLevel1b from '@data/level1b.txt';
import dataLevel2a from '@data/level2a.txt';
import dataLevel2b from '@data/level2b.txt';
import dataLevel2c from '@data/level2c.txt';
import dataLevel3a from '@data/level3a.txt';
import { shuffle } from '@shared/utils/array.util';

const WORDS_GROUP_SIZE = 40;

export const WORDS_CATEGORIES = [
  buildWordsCategory(
    'LEVEL1A',
    'Niveau 1a',
    'niveau-1a',
    dataToWords(dataLevel1a)
  ),
  buildWordsCategory(
    'LEVEL1B',
    'Niveau 1b',
    'niveau-1b',
    dataToWords(dataLevel1b)
  ),
  buildWordsCategory(
    'LEVEL2A',
    'Niveau 2a',
    'niveau-2a',
    dataToWords(dataLevel2a)
  ),
  buildWordsCategory(
    'LEVEL2B',
    'Niveau 2b',
    'niveau-2b',
    dataToWords(dataLevel2b)
  ),
  buildWordsCategory(
    'LEVEL2C',
    'Niveau 2c',
    'niveau-2c',
    dataToWords(dataLevel2c)
  ),
  buildWordsCategory(
    'LEVEL3A',
    'Niveau 3a',
    'niveau-3a',
    dataToWords(dataLevel3a)
  ),
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
