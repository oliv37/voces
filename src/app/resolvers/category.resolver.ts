import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Category } from '@models/category.model';
import { findCategory } from '@utils/category.util';

export const resolveCategory: ResolveFn<Category> = (route) => {
  const categoryPathParam = getCategoryPathParam(route);
  return findCategory(categoryPathParam)!;
};

function getCategoryPathParam(route: ActivatedRouteSnapshot): string | null {
  return route.paramMap.get('category');
}
