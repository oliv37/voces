import { ResolveFn } from '@angular/router';
import { LangCode } from '@shared/lang/lang.model';
import { Word } from './word.model';
import { findAllWords, findWordsInCategory } from './word.util';

export const resolveWords: ResolveFn<Word[]> = async (route) => {
  const langCode = route.paramMap.get('langCode') as LangCode;
  return await findAllWords(langCode);
};

export const resolveWordsInCategoryResolver: ResolveFn<Word[]> = async (
  route
) => {
  const langCode = route.parent?.parent?.paramMap.get('langCode') as LangCode;
  const categoryNumber = Number(route.parent?.paramMap.get('categoryNumber'));
  return await findWordsInCategory(langCode, categoryNumber);
};
