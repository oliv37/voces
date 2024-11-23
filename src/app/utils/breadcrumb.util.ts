import { ActivatedRouteSnapshot } from '@angular/router';
import type { Breadcrumb, BreadcrumbItem } from '../models/breadcrumb.model';
import { Type } from '@angular/core';
import { NotFoundPageComponent } from '../pages/not-found/not-found-page.component';
import { Category } from '@models/category.model';

const ROOT_BREADCRUMB_ITEM: BreadcrumbItem = { url: '/', label: 'voces' };

export function buildBreadcrumb(
  route: ActivatedRouteSnapshot | null
): Breadcrumb {
  const breadcrumb: Breadcrumb = [ROOT_BREADCRUMB_ITEM];
  let component: Type<unknown> | null = null;

  while (route != null) {
    if (route.url.length > 0) {
      addBreadcrumbItem(breadcrumb, route);
    }
    component = route.component;
    route = route.firstChild;
  }

  return component != null && component != NotFoundPageComponent
    ? breadcrumb
    : [ROOT_BREADCRUMB_ITEM];
}

function addBreadcrumbItem(
  breadcrumb: Breadcrumb,
  route: ActivatedRouteSnapshot
): void {
  const category: Category | undefined = route.data['category'];
  const label = route.url
    .map((segment) => segment.toString())
    .map((segment) =>
      segment === category?.pathParam ? category.label : segment
    )
    .join(' ')
    .replaceAll('-', ' ');

  const previousUrl: string =
    breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1].url : '';
  const url = [previousUrl, ...route.url].join('/');

  breadcrumb.push({
    label,
    url,
  });
}
