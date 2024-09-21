import { ActivatedRouteSnapshot } from '@angular/router';
import { WordsCategory, WordsGroup } from '../models/words.model';

export function resolveWordsCategoryTitle(
  route: ActivatedRouteSnapshot | null
): string {
  const wordsCategoryLabel = getWordsCategoryLabel(route);
  return `Vocabulaire Espagnol | ${wordsCategoryLabel} - Voces`;
}

export function resolveWordsGroupTitle(
  route: ActivatedRouteSnapshot | null
): string {
  const wordsCategoryLabel = getWordsCategoryLabel(route);
  const wordsGroupId = getWordsGroupId(route);
  return `Vocabulaire Espagnol | ${wordsCategoryLabel} | ${wordsGroupId} - Voces`;
}

export function resolveWordsExerciceTitle(
  route: ActivatedRouteSnapshot | null
): string {
  const wordsCategoryLabel = getWordsCategoryLabel(route);
  const wordsGroupId = getWordsGroupId(route);
  return `Vocabulaire Espagnol | ${wordsCategoryLabel} | ${wordsGroupId} | Exercice - Voces`;
}

function getWordsCategoryLabel(route: ActivatedRouteSnapshot | null): string {
  return getData<WordsCategory>(route, 'wordsCategory')?.label || '';
}

function getWordsGroupId(route: ActivatedRouteSnapshot | null): string {
  return getData<WordsGroup>(route, 'wordsGroup')?.pathParam || '';
}

function getData<T>(
  route: ActivatedRouteSnapshot | null,
  dataKey: string
): T | null {
  while (route != null) {
    if (route.data[dataKey]) {
      return route.data[dataKey] as T;
    }
    route = route.parent;
  }

  return null;
}
