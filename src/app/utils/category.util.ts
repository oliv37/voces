import { Category } from '@models/category.model';
import { ActivatedRouteSnapshot } from '@angular/router';
import { getData } from './route.util';
import { DATA } from './data.util';

export function findCategory(
  categoryPathParam: string | null
): Category | undefined {
  return DATA.flat().find(({ pathParam }) => pathParam === categoryPathParam);
}

export function getCategoryLabel(route: ActivatedRouteSnapshot | null): string {
  return getData<Category>(route, 'category')?.label || '';
}
