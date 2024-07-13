import { LangCode } from '@shared/lang/lang.constant';
import { Category, Word } from './word.model';

export const CATEGORY_SIZE = 100;

export async function findAllWords(langCode: LangCode): Promise<Word[]> {
  const module = await import(`../../data/${langCode}.txt`);
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

export async function countAllWords(langCode: LangCode): Promise<number> {
  return (await findAllWords(langCode)).length;
}

export async function findCategories(langCode: LangCode): Promise<Category[]> {
  const allWords = await findAllWords(langCode);
  const nbWords = allWords.length;
  const nbCategories = Math.ceil(nbWords / CATEGORY_SIZE);
  return [...Array(nbCategories).keys()].map((i) => {
    const start = i * CATEGORY_SIZE;
    const end = Math.min(start + CATEGORY_SIZE, allWords.length);
    return { id: i + 1, words: allWords.slice(start, end) };
  });
}

export async function findWordsInCategory(
  langCode: LangCode,
  categoryId: number
): Promise<Word[]> {
  const allWords = await findAllWords(langCode);
  const start = (categoryId - 1) * CATEGORY_SIZE;
  const end = Math.min(start + CATEGORY_SIZE, allWords.length);
  return allWords.slice(start, end);
}

export function findRandomWords(words: Word[], nbWords: number): Word[] {
  const indexes = new Set<number>();
  const maxSize = Math.min(words.length, nbWords);

  while (indexes.size < maxSize) {
    indexes.add(Math.floor(Math.random() * words.length));
  }

  return [...indexes].map((v) => words[v]);
}
