import { ResolveFn } from '@angular/router';
import type { WordGroup } from '../models/word';
import { WORD_GROUPS_PROMISE } from '../datas/word-data';

export const wordGroupsResolver: ResolveFn<WordGroup[]> = () =>
  WORD_GROUPS_PROMISE;
