import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { WordsCategory, WordsGroup } from '../models/words.model';
import { findWordsCategory, findWordsGroup } from '../utils/words.util';

export const resolveWordsCategory: ResolveFn<WordsCategory> = (route) => {
  const wordsCategoryPathParam = getWordsCategoryPathParam(route);
  return findWordsCategory(wordsCategoryPathParam)!;
};

export const resolveWordsGroup: ResolveFn<WordsGroup> = (route) => {
  const wordsCategoryPathParam = getWordsCategoryPathParam(route);
  const wordsGroupPathParam = getWordsGroupPathParam(route);
  return findWordsGroup(wordsCategoryPathParam, wordsGroupPathParam)!;
};

function getWordsCategoryPathParam(
  route: ActivatedRouteSnapshot
): string | null {
  return route.paramMap.get('wordsCategory');
}

function getWordsGroupPathParam(route: ActivatedRouteSnapshot): string | null {
  return route.paramMap.get('wordsGroup');
}
