import { ActivatedRouteSnapshot } from '@angular/router';
import { getCategoryLabel } from '@utils/category.util';
import { getGroupLabel } from '@utils/group.util';

export function resolveGroupTitle(
  route: ActivatedRouteSnapshot | null
): string {
  const categoryLabel = getCategoryLabel(route);
  const groupLabel = getGroupLabel(route);
  return `Vocabulaire Espagnol | ${categoryLabel} | Groupe ${groupLabel} - Voces`;
}
