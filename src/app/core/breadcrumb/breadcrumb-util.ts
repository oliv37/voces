import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import type { Breadcrumb, BreadcrumbItem } from './breadcrumb.model';
import { NotFoundPage } from '../../not-found/not-found-page/not-found-page';

const ROOT_BREADCRUMB: Breadcrumb = [
  {
    url: '/',
    label: 'VOCES',
  },
];

export function buildBreadcrumb(route: ActivatedRoute): Breadcrumb {
  return buildBreadcrumbRecursively(route.root.snapshot, ROOT_BREADCRUMB);
}

function buildBreadcrumbRecursively(
  route: ActivatedRouteSnapshot | null,
  breadcrumb: Breadcrumb
): Breadcrumb {
  if (route == null) {
    return breadcrumb;
  }

  if (route.component === NotFoundPage) {
    return ROOT_BREADCRUMB;
  }

  if (route.url.length <= 0) {
    return buildBreadcrumbRecursively(route.firstChild, breadcrumb);
  }

  const previousUrl: string = getLastUrl(breadcrumb);
  const label = route.url
    .join(' ')
    .replace('text ', '')
    .replaceAll('-', ' ')
    .replaceAll('_', ' ')
    .trim();

  const breadcrumbItem: BreadcrumbItem = {
    label,
    url: [previousUrl, ...route.url].join('/'),
  };

  return buildBreadcrumbRecursively(route.firstChild, [
    ...breadcrumb,
    breadcrumbItem,
  ]);
}

function getLastUrl(breadcrumb: Breadcrumb): string {
  return breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1].url : '';
}
