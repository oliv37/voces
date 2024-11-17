import { Group } from '@models/group.model';
import { findCategory } from './category.util';
import { ActivatedRouteSnapshot } from '@angular/router';
import { getData } from './route.util';

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
