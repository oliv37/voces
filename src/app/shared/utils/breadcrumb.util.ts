import { ActivatedRouteSnapshot } from '@angular/router';
import type { Breadcrumb, BreadcrumbItem } from '../models/breadcrumb.model';
import { Type } from '@angular/core';
import { NotFoundComponent } from '@core/pages/not-found/not-found.component';

const ROOT_BREADCRUMB_ITEM: BreadcrumbItem = { url: '/', label: 'voces' };

export function buildBreadcrumb(
  route: ActivatedRouteSnapshot | null
): Breadcrumb {
  const breadcrumb: Breadcrumb = [ROOT_BREADCRUMB_ITEM];
  let component: Type<any> | null = null;

  while (route != null) {
    if (route.url.length > 0) {
      addBreadcrumbItem(breadcrumb, route);
    }
    component = route.component;
    route = route.firstChild;
  }

  return component != null && component != NotFoundComponent
    ? breadcrumb
    : [ROOT_BREADCRUMB_ITEM];
}

function addBreadcrumbItem(
  breadcrumb: Breadcrumb,
  route: ActivatedRouteSnapshot
): void {
  const previousUrl: string =
    breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1].url : '';

  breadcrumb.push({
    label: route.url.join(' '),
    url: [previousUrl, ...route.url].join('/'),
  });
}
