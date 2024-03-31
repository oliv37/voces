import { ResolveFn } from '@angular/router';
import { LANG } from '../shared/lang.constants';
import { Word } from './word.model';
import { findCategoryWords } from './word.utils';

export const wordsResolver: ResolveFn<Word[]> = async (route) => {
  const lang = route.parent?.parent?.paramMap.get('lang') as LANG;
  const categoryNumber = Number(route.parent?.paramMap.get('categoryNumber'));
  return await findCategoryWords(lang, categoryNumber);
};
