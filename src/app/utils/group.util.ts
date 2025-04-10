import { Group } from '@models/group.model';
import { findCategory } from './category.util';
import { ActivatedRouteSnapshot } from '@angular/router';
import { getData } from './route.util';
import { DATA } from './data.util';
import { Category } from '@models/category.model';

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

export function findPreviousGroup(group: Group): Group {
  const categories: Category[] = DATA.flat();
  const category = group.category;

  const categoryIdx = categories.findIndex((c) => c.id === category.id);
  const groupIdx = category.groups.findIndex((g) => g.id === group.id);
  if (categoryIdx === -1 || groupIdx === -1) {
    return categories[0].groups[0];
  }

  const isFirstGroup = groupIdx === 0;
  if (isFirstGroup) {
    const previousCategory =
      categories[(categoryIdx - 1 + categories.length) % categories.length];
    return previousCategory.groups[previousCategory.groups.length - 1];
  }

  return category.groups[groupIdx - 1];
}

export function findNextGroups(
  fromGroup: Group | undefined,
  nbGroups: number
): Group[] {
  const groups: Group[] = DATA.flat()
    .map((c) => c.groups)
    .flat();
  const groupIdx = groups.findIndex((g) => g.id === fromGroup?.id);

  return groupIdx >= 0
    ? groups.slice(
        groupIdx + 1,
        Math.min(groupIdx + nbGroups + 1, groups.length)
      )
    : [];
}
