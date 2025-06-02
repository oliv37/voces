import { ActivatedRouteSnapshot } from '@angular/router';
import type { Category } from '@models/category';
import { getData } from '@utils/route';
import { DATA } from '@utils/data';

export function findCategory(
  categoryPathParam: string | null
): Category | undefined {
  return DATA.flat().find(({ pathParam }) => pathParam === categoryPathParam);
}

export function getCategoryLabel(route: ActivatedRouteSnapshot | null): string {
  return getData<Category>(route, 'category')?.label || '';
}
