import type { Word, WordGroup } from '../models/word';

const WORD_GROUP_SIZE = 10;

export const WORDS_PROMISE: Promise<Word[]> = import(
  '../../../data/words.txt'
).then((m) => buildWords(m.default));

export const WORD_GROUPS_PROMISE: Promise<WordGroup[]> = WORDS_PROMISE.then(
  (words) => buildWordGroups(words)
);

function buildWordGroups(words: Word[]): WordGroup[] {
  const nbWords = words.length;
  const nbGroups = Math.ceil(nbWords / WORD_GROUP_SIZE);

  return [...Array(nbGroups).keys()].map((i) => {
    const start = i * WORD_GROUP_SIZE;
    const end = Math.min(start + WORD_GROUP_SIZE, nbWords);
    return {
      id: i + 1,
      words: words.slice(start, end),
    };
  });
}

function buildWords(data: string): Word[] {
  return data
    .split('\n')
    .filter((line) => !!line)
    .map((line, i) => {
      const [es, fr, example] = line.split(' : ');
      return {
        id: i + 1,
        es,
        fr,
        example,
      };
    });
}
