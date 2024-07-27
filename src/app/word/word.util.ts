import { LangCode } from '@shared/lang/lang.model';
import { Category, Word } from './word.model';

export const CATEGORY_SIZE = 50;

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
