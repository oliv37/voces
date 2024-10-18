import { Group } from '@models/group.model';
import { Word } from '@models/word.model';
import { findCategory } from './category.util';
import { ActivatedRouteSnapshot } from '@angular/router';
import { getData } from './route.util';

const GROUP_SIZE = 40;

export function findGroup(
  categoryPathParam: string | null,
  groupPathParam: string | null
) {
  return findCategory(categoryPathParam)?.groups.find(
    ({ pathParam }) => pathParam === groupPathParam
  );
}

export function getGroupLabel(route: ActivatedRouteSnapshot | null): string {
  return getData<Group>(route, 'group')?.label || '';
}

export function buildGroups(categoryId: string, words: Word[]): Group[] {
  const nbWords = words.length;
  const nbGroups = Math.ceil(nbWords / GROUP_SIZE);
  return [...Array(nbGroups).keys()].map((i) => {
    const start = i * GROUP_SIZE;
    const end = Math.min(start + GROUP_SIZE, nbWords);
    const index = i + 1;
    return {
      id: `${categoryId}_${index}`,
      label: `${index}`,
      pathParam: `${index}`,
      words: words.slice(start, end),
    };
  });
}
