import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { isLangCode } from '@shared/lang/lang.util';
import { CATEGORY_SIZE, countAllWords } from './word.util';

function isPositiveInteger(str?: string): boolean {
  return str != undefined && /^[1-9]\d*$/.test(str);
}

export const wordsMatcher: CanMatchFn = async (
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
