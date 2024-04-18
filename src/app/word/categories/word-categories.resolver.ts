import { ResolveFn } from '@angular/router';
import { findCategories } from '../word.utils';
import { LangCode } from '../../shared/constants/lang.constants';

export const categoriesResolver: ResolveFn<string[]> = async (route) => {
  const langCode = route.paramMap.get('langCode') as LangCode;
  return await findCategories(langCode);
};
