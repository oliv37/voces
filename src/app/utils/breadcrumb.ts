import { ActivatedRouteSnapshot } from '@angular/router';
import { Type } from '@angular/core';
import type { Breadcrumb, BreadcrumbItem } from '@models/breadcrumb';
import { NotFoundPage } from '@pages/not-found/not-found-page';

const ROOT_BREADCRUMB_ITEM: BreadcrumbItem = {
  url: '/',
  label: 'VOCES',
};

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

  return component != null && component != NotFoundPage
    ? breadcrumb
    : [ROOT_BREADCRUMB_ITEM];
}

function addBreadcrumbItem(
  breadcrumb: Breadcrumb,
  route: ActivatedRouteSnapshot
): void {
  const previousUrl: string =
    breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1].url : '';

  const label = route.url.map((segment) => segment.toString()).join(' ');
  const url = [previousUrl, ...route.url].join('/');
  breadcrumb.push({
    label,
    url,
  });
}
