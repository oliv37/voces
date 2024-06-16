import { getLangLabel } from '@shared/lang/lang.util';
import {
  BreadCrumb,
  BreadCrumbItem,
  BreadCrumbProvider,
} from './breadcrumb.model';
import { LangCode } from '@shared/lang/lang.constant';

function getSegmentUrls(url: string): string[] {
  return url.split('/').filter((s) => s != '');
}

function toUrl(segmentUrls: string[], idx: number) {
  return '/' + segmentUrls.slice(0, idx + 1).join('/');
}

const ROOT_BREADCRUMB_ITEM: BreadCrumbItem = { url: '/', label: 'Vocab' };

const WORD_BREADCRUMB_PROVIDER: BreadCrumbProvider = {
  match: () => true,
  get(url: string) {
    const segmentUrls = getSegmentUrls(url);
    return [
      ROOT_BREADCRUMB_ITEM,
      ...segmentUrls.map((segmentUrl, idx) => {
        const label =
          idx === 0 ? getLangLabel(segmentUrl as LangCode) : segmentUrl;
        return { url: toUrl(segmentUrls, idx), label };
      }),
    ];
  },
};

const ALL_BREADCRUMB_PROVIDERS: BreadCrumbProvider[] = [
  WORD_BREADCRUMB_PROVIDER,
];

const DEFAULT_BREADCRUMB: BreadCrumb = [ROOT_BREADCRUMB_ITEM];

export function findBreadCrumb(url: string): BreadCrumb {
  return (
    ALL_BREADCRUMB_PROVIDERS.find((breadcrumbProvider) =>
      breadcrumbProvider.match(url)
    )?.get(url) || DEFAULT_BREADCRUMB
  );
}
