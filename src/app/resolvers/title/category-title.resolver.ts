import { ActivatedRouteSnapshot } from '@angular/router';
import { getCategoryLabel } from '@utils/category.util';

export function resolveCategoryTitle(
  route: ActivatedRouteSnapshot | null
): string {
  const wordsCategoryLabel = getCategoryLabel(route);
  return `Vocabulaire Espagnol | ${wordsCategoryLabel} - Voces`;
}
