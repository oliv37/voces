import { CanMatchFn } from '@angular/router';
import { findWordsCategory, findWordsGroup } from '../utils/words.util';

export const canMatchWords: CanMatchFn = (route, segments) => {
  if (segments.length === 0) {
    return true;
  }

  if (segments.length === 1) {
    const wordsCategoryPathParam = segments[0].path;
    return !!findWordsCategory(wordsCategoryPathParam);
  }

  if (segments.length >= 2) {
    const wordsCategoryPathParam = segments[0].path;
    const wordsGroupPathParam = segments[1].path;
    return !!findWordsGroup(wordsCategoryPathParam, wordsGroupPathParam);
  }

  return false;
};
