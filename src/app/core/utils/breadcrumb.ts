import { ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import type { Breadcrumb, BreadcrumbItem } from '../models/breadcrumb';
import { NotFoundPage } from '../../not-found/not-found-page';

const ROOT_BREADCRUMB_ITEM: BreadcrumbItem = {
  url: '/',
  label: 'VOCES',
};

export function buildBreadcrumb(root: ActivatedRouteSnapshot): Breadcrumb {
  return _buildBreadcrumb(root, [ROOT_BREADCRUMB_ITEM]);
}

function _buildBreadcrumb(
  route: ActivatedRouteSnapshot | null,
  breadcrumb: Breadcrumb
): Breadcrumb {
  if (route == null) {
    return breadcrumb;
  }

  if (route.component === NotFoundPage) {
    return [ROOT_BREADCRUMB_ITEM];
  }

  if (route.url.length <= 0) {
    return _buildBreadcrumb(route.firstChild, breadcrumb);
  }

  const previousUrl: string = getPreviousUrl(breadcrumb);
  const currentUrl: UrlSegment[] = route.url;
  const breadcrumbItem = createBreadcrumItem(previousUrl, currentUrl);

  return _buildBreadcrumb(route.firstChild, [...breadcrumb, breadcrumbItem]);
}

function getPreviousUrl(breadcrumb: Breadcrumb): string {
  return breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1].url : '';
}

function createBreadcrumItem(
  previousUrl: string,
  currentUrl: UrlSegment[]
): BreadcrumbItem {
  const label = currentUrl.join(' ');
  const url = [previousUrl, ...currentUrl].join('/');

  return { label, url };
}
