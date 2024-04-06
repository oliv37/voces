import { ResolveFn } from '@angular/router';
import { LANG } from '../shared/lang.constants';
import { Word } from './word.model';
import { findWordsInCategory } from './word.utils';

export const wordsInCategoryResolver: ResolveFn<Word[]> = async (route) => {
  const lang = route.parent?.parent?.paramMap.get('lang') as LANG;
  const categoryNumber = Number(route.parent?.paramMap.get('categoryNumber'));
  return await findWordsInCategory(lang, categoryNumber);
};
