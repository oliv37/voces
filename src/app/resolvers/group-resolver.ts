import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import type { Group } from '@models/group';
import { findGroup } from '@utils/group';

export const groupResolver: ResolveFn<Group> = (route) => {
  const categoryPathParam = getCategoryPathParam(route);
  const groupPathParam = getGroupPathParam(route);
  return findGroup(categoryPathParam, groupPathParam)!;
};

function getCategoryPathParam(route: ActivatedRouteSnapshot): string | null {
  return route.paramMap.get('category');
}

function getGroupPathParam(route: ActivatedRouteSnapshot): string | null {
  return route.paramMap.get('group');
}
