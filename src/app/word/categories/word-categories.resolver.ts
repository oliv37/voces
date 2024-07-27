import { ResolveFn } from '@angular/router';
import { LangCode } from '@shared/lang/lang.model';
import { findCategories } from '../word.util';
import { Category } from '@word/word.model';

export const resolveCategories: ResolveFn<Category[]> = async (route) => {
  const langCode = route.paramMap.get('langCode') as LangCode;
  return await findCategories(langCode);
};
