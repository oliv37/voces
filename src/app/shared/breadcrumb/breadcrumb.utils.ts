import { UrlSegment } from '@angular/router';
import { LangCode } from '@shared/lang/lang.constants';
import { getLangLabel } from '@shared/lang/lang.utils';

interface Options {
  idx: number;
  segments: UrlSegment[];
}

type LinkLabelFn = (opts: Options) => string;

const linkLabelProviders: Record<number, LinkLabelFn> = {
  0: () => 'vocab',
  1: ({ idx, segments }) => getLangLabel(segments[idx].path as LangCode),
  2: ({ idx, segments }) => segments[idx].path,
};

export function getLinkLabel(opts: Options): string {
  const linkLabelFn: LinkLabelFn | undefined = linkLabelProviders[opts.idx];

  if (linkLabelFn) {
    return linkLabelFn(opts);
  }

  return opts.segments[opts.idx].path;
}
