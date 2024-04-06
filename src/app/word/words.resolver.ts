import { ResolveFn } from '@angular/router';
import { LANG } from '../shared/lang.constants';
import { Word } from './word.model';
import { findAllWords } from './word.utils';

export const wordsResolver: ResolveFn<Word[]> = async (route) => {
  const lang = route.paramMap.get('lang') as LANG;
  return await findAllWords(lang);
};
