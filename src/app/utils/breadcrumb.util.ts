import { ActivatedRouteSnapshot } from '@angular/router';
import type { Breadcrumb, BreadcrumbItem } from '../models/breadcrumb.model';
import { Type } from '@angular/core';
import { NotFoundPageComponent } from '../pages/not-found/not-found-page.component';
import { Category } from '@models/category.model';
import { Group } from '@models/group.model';

const ROOT_BREADCRUMB_ITEM: BreadcrumbItem = { url: '/', label: 'Voces' };

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
  const group: Group | undefined = route.data['group'];
  const previousUrl: string =
    breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1].url : '';

  const label = route.url
    .map((segment) => segment.toString())
    .map((segment) => {
      if (segment === category?.pathParam) {
        return category?.label;
      }
      if (segment === group?.pathParam) {
        return group?.label;
      }
      return segment;
    })
    .join(' ')
    .replaceAll('-', ' ');
  const url = [previousUrl, ...route.url].join('/');
  const bgColor =
    label === category?.label ? category?.color.bgColor : undefined;
  const isBold = label === group?.label;

  breadcrumb.push({
    label,
    url,
    bgColor,
    isBold,
  });
}
