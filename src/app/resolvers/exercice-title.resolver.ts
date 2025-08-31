import { ActivatedRouteSnapshot } from '@angular/router';

export function exerciceTitleResolver(route: ActivatedRouteSnapshot): string {
  const id = route.paramMap.get('id');
  return `Exercice ${id} Vocabulaire Espagnol - Voces`;
}
