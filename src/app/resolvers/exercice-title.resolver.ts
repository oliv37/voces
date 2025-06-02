import { ActivatedRouteSnapshot } from '@angular/router';
import { getCategoryLabel } from '@utils/category';
import { getGroupLabel } from '@utils/group';

export function exerciceTitleResolver(
  route: ActivatedRouteSnapshot | null
): string {
  const categoryLabel = getCategoryLabel(route);
  const groupLabel = getGroupLabel(route);
  return `Exercice Vocabulaire Espagnol ${categoryLabel} Groupe ${groupLabel} - Voces`;
}
