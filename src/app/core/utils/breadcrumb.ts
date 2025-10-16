import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  UrlSegment,
} from '@angular/router';
import type { Breadcrumb, BreadcrumbItem } from '../models/breadcrumb';
import { NotFoundPage } from '../../not-found/not-found-page';

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
  const currentUrl: UrlSegment[] = route.url;
  const breadcrumbItem = createBreadcrumItem(previousUrl, currentUrl);

  return buildBreadcrumbRecursively(route.firstChild, [
    ...breadcrumb,
    breadcrumbItem,
  ]);
}

function createBreadcrumItem(
  previousUrl: string,
  currentUrl: UrlSegment[]
): BreadcrumbItem {
  const label = currentUrl.join(' ');
  const url = [previousUrl, ...currentUrl].join('/');

  return { label, url };
}

function getLastUrl(breadcrumb: Breadcrumb): string {
  return breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1].url : '';
}
