import { ActivatedRouteSnapshot } from '@angular/router';
import { getCategoryLabel } from '@utils/category';

export function categoryTitleResolver(
  route: ActivatedRouteSnapshot | null
): string {
  const wordsCategoryLabel = getCategoryLabel(route);
  return `Vocabulaire Espagnol ${wordsCategoryLabel} - Voces`;
}
