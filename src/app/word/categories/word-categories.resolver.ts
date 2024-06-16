import { ResolveFn } from '@angular/router';
import { LangCode } from '@shared/lang/lang.constant';
import { findCategories } from '../word.util';

export const resolveCategories: ResolveFn<string[]> = async (route) => {
  const langCode = route.paramMap.get('langCode') as LangCode;
  return await findCategories(langCode);
};
