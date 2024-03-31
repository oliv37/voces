import { LANG } from '../shared/lang.constants';
import { Word, WordCategory } from './word.model';

export const CATEGORY_SIZE = 100;

export async function findAllWords(lang: LANG): Promise<Word[]> {
  const module = await import(`../../data/${lang}.txt`);
  const text: string = module.default;
  return text
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

export async function countAllWords(lang: LANG): Promise<number> {
  return (await findAllWords(lang)).length;
}

export async function findCategoryWords(
  lang: LANG,
  categoryId: number
): Promise<Word[]> {
  const allWords = await findAllWords(lang);
  const start = (categoryId - 1) * CATEGORY_SIZE;
  const end = Math.min(start + CATEGORY_SIZE, allWords.length);
  return allWords.slice(start, end);
}

export function findRandomWords(words: Word[], nbWords: number = 10): Word[] {
  const indexes = new Set<number>();
  const maxSize = Math.min(words.length, nbWords);

  while (indexes.size < maxSize) {
    indexes.add(Math.floor(Math.random() * words.length));
  }

  return [...indexes].map((v) => words[v]);
}

export async function findCategories(lang: LANG): Promise<WordCategory[]> {
  const nbWords = await countAllWords(lang);
  const nbCategories = Math.ceil(nbWords / CATEGORY_SIZE);
  return [...Array(nbCategories).keys()].map((i) => ({
    start: i * CATEGORY_SIZE + 1,
    end: Math.min((i + 1) * CATEGORY_SIZE, nbWords),
  }));
}