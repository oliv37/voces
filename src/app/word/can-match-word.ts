import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { CATEGORY_SIZE, countAllWords } from './word.utils';
import { isPositiveInteger } from '../shared/string.utils';
import { isLangCode } from '../shared/lang/lang.utils';

export const canMatchWord: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const langCode = segments[0].path;

  if (!isLangCode(langCode)) {
    return false;
  }

  if (segments.length > 1) {
    const categoryId = segments[1].path;

    if (!isPositiveInteger(categoryId)) {
      return false;
    }

    const nbWords = await countAllWords(langCode);
    const nbCategories = Math.ceil(nbWords / CATEGORY_SIZE);

    return +categoryId <= nbCategories;
  }

  return true;
};
