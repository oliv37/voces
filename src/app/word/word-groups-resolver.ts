import { ResolveFn } from '@angular/router';
import type { WordGroup } from './word';
import { WORD_GROUPS_PROMISE } from './word-data';

export const wordGroupsResolver: ResolveFn<WordGroup[]> = () =>
  WORD_GROUPS_PROMISE;
