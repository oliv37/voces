import { Category } from '@models/category.model';
import { Word } from '@models/word.model';
import { buildGroups } from './group.util';
import { buildWords } from './word.util';
import dataLevel1a from '@data/level1a.txt';
import dataLevel1b from '@data/level1b.txt';
import dataLevel2a from '@data/level2a.txt';
import dataLevel2b from '@data/level2b.txt';
import dataLevel2c from '@data/level2c.txt';
import dataLevel3a from '@data/level3a.txt';
import { ActivatedRouteSnapshot } from '@angular/router';
import { getData } from './route.util';

export const CATEGORIES = [
  buildCategory('LEVEL1A', 'Niveau 1a', 'niveau-1a', buildWords(dataLevel1a)),
  buildCategory('LEVEL1B', 'Niveau 1b', 'niveau-1b', buildWords(dataLevel1b)),
  buildCategory('LEVEL2A', 'Niveau 2a', 'niveau-2a', buildWords(dataLevel2a)),
  buildCategory('LEVEL2B', 'Niveau 2b', 'niveau-2b', buildWords(dataLevel2b)),
  buildCategory('LEVEL2C', 'Niveau 2c', 'niveau-2c', buildWords(dataLevel2c)),
  buildCategory('LEVEL3A', 'Niveau 3a', 'niveau-3a', buildWords(dataLevel3a)),
] as const;

export function findCategory(
  categoryPathParam: string | null
): Category | undefined {
  return CATEGORIES.find(({ pathParam }) => pathParam === categoryPathParam);
}

export function getCategoryLabel(route: ActivatedRouteSnapshot | null): string {
  return getData<Category>(route, 'category')?.label || '';
}

function buildCategory(
  id: string,
  label: string,
  pathParam: string,
  words: Word[]
): Category {
  return {
    id,
    label,
    pathParam,
    nbWords: words.length,
    groups: buildGroups(id, words),
  };
}
