import { ResolveFn } from '@angular/router';
import { LangCode } from '@shared/lang/lang.constants';
import { findCategories } from '../word.utils';

export const categoriesResolver: ResolveFn<string[]> = async (route) => {
  const langCode = route.paramMap.get('langCode') as LangCode;
  return await findCategories(langCode);
};
