import { ResolveFn } from '@angular/router';
import { WordCategory } from '../word.model';
import { LANG } from '../../shared/lang.constants';
import { findCategories } from '../word.utils';

export const categoriesResolver: ResolveFn<WordCategory[]> = async (route) => {
  const lang = route.paramMap.get('lang') as LANG;
  return await findCategories(lang);
};
