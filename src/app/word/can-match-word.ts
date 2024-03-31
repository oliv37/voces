import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { CATEGORY_SIZE, countAllWords } from './word.utils';
import { isLang, isPositiveInteger } from '../shared/string.utils';

export const canMatchWord: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const lang = segments[0].path;

  if (!isLang(lang)) {
    return false;
  }

  if (segments.length > 1) {
    const categoryId = segments[1].path;

    if (!isPositiveInteger(categoryId)) {
      return false;
    }

    const nbWords = await countAllWords(lang);
    const nbCategories = Math.ceil(nbWords / CATEGORY_SIZE);

    if (+categoryId > nbCategories) {
      return false;
    }
  }

  return true;
};
