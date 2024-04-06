import { UrlSegment } from '@angular/router';
import { LANG, LANG_LABELS } from '../../shared/lang.constants';
import { toCategory } from '../word.utils';

interface Options {
  idx: number;
  segments: UrlSegment[];
  nbWords: number;
}

type LinkLabelFn = (opts: Options) => string;

const linkLabelProvicers: Record<string, LinkLabelFn> = {
  0: () => 'vocab',
  1: ({ idx, segments }) => LANG_LABELS[segments[idx].path as LANG],
  2: ({ idx, segments, nbWords }) =>
    toCategory(Number(segments[idx].path), nbWords),
};

export function getLinkLabel(opts: Options): string {
  const linkLabelFn: LinkLabelFn | undefined = linkLabelProvicers[opts.idx];

  if (linkLabelFn) {
    return linkLabelFn(opts);
  }

  return opts.segments[opts.idx].path;
}
