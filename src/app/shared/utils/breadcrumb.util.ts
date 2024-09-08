import type { BreadCrumb, BreadCrumbItem } from '../models/breadcrumb.model';

function getSegmentUrls(url: string): string[] {
  return url
    .split('?')[0]
    .split('#')[0]
    .split('/')
    .filter((s) => s != '');
}

function toUrl(segmentUrls: string[], idx: number) {
  return '/' + segmentUrls.slice(0, idx + 1).join('/');
}

const ROOT_BREADCRUMB_ITEM: BreadCrumbItem = { url: '/', label: 'voces' };

export function buildBreadCrumb(url: string): BreadCrumb {
  const segmentUrls = getSegmentUrls(url);
  return [
    ROOT_BREADCRUMB_ITEM,
    ...segmentUrls.map((segmentUrl, idx) => {
      const label = segmentUrl;
      return { url: toUrl(segmentUrls, idx), label };
    }),
  ];
}
