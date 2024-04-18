import { UrlSegment } from '@angular/router';
import { LangCode, LANG_LABELS } from '../../shared/constants/lang.constants';
import { toCategory } from '../word.utils';
import { getLangLabel } from '../../shared/utils/lang.utils';

interface Options {
  idx: number;
  segments: UrlSegment[];
  nbWords: number;
}

type LinkLabelFn = (opts: Options) => string;

const linkLabelProvicers: Record<string, LinkLabelFn> = {
  0: () => 'vocab',
  1: ({ idx, segments }) => getLangLabel(segments[idx].path as LangCode),
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
