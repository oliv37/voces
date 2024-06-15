import { ResolveFn } from '@angular/router';
import { LangCode } from '@shared/lang/lang.constants';
import { Word } from './word.model';
import { findAllWords } from './word.utils';

export const wordsResolver: ResolveFn<Word[]> = async (route) => {
  const langCode = route.paramMap.get('langCode') as LangCode;
  return await findAllWords(langCode);
};
