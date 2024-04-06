import { ResolveFn } from '@angular/router';
import { LANG } from '../../shared/lang.constants';
import { findCategories } from '../word.utils';

export const categoriesResolver: ResolveFn<string[]> = async (route) => {
  const lang = route.paramMap.get('lang') as LANG;
  return await findCategories(lang);
};
