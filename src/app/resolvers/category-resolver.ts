import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import type { Category } from '@models/category';
import { findCategory } from '@utils/category';

export const categoryResolver: ResolveFn<Category> = (route) => {
  const categoryPathParam = getCategoryPathParam(route);
  return findCategory(categoryPathParam)!;
};

function getCategoryPathParam(route: ActivatedRouteSnapshot): string | null {
  return route.paramMap.get('category');
}
