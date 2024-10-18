import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Group } from '@models/group.model';
import { findGroup } from '@utils/group.util';

export const resolveGroup: ResolveFn<Group> = (route) => {
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
