import {
  WordsCategory,
  Word,
  WordsCategoryId,
  WordsGroup,
} from '../models/word.model';
import _dataLevel1 from '@data/level1.txt';
import _dataLevel2 from '@data/level2.txt';
import _dataLevel3 from '@data/level3.txt';
import { shuffle } from '@shared/utils/array.util';

const base64Prefix = 'data:text/plain;base64,';

const dataLevel1 = decode(_dataLevel1);
const dataLevel2 = decode(_dataLevel2);
const dataLevel3 = decode(_dataLevel3);

const WORDS_GROUP_SIZE = 40;

const WORDS_LEVEL1: Word[] = dataToWords(dataLevel1);
const WORDS_LEVEL2: Word[] = dataToWords(dataLevel2);
const WORDS_LEVEL3: Word[] = dataToWords(dataLevel3);

export const WORDS_CATEGORIES: Readonly<WordsCategory>[] = [
  buildWordsCategory('LEVEL1', 'Niveau 1', 'niveau1', WORDS_LEVEL1),
  buildWordsCategory('LEVEL2', 'Niveau 2', 'niveau2', WORDS_LEVEL2),
  buildWordsCategory('LEVEL3', 'Niveau 3', 'niveau3', WORDS_LEVEL3),
];

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

function dataToWords(data: string): Word[] {
  return data
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

function buildWordsCategory(
  id: WordsCategoryId,
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

function toWordsGroups(
  wordsCategoryId: WordsCategoryId,
  words: Word[]
): WordsGroup[] {
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

function decode(str: string) {
  if (str.startsWith(base64Prefix)) {
    return atob(str.substring(base64Prefix.length));
  }
  return str;
}
