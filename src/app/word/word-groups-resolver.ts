import { ResolveFn } from '@angular/router';
import type { WordGroup } from './word.model';
import { WORD_GROUPS_PROMISE } from './word-data';

export const wordGroupsResolver: ResolveFn<WordGroup[]> = () =>
  WORD_GROUPS_PROMISE;
