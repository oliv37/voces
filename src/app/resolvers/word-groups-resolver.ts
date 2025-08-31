import { ResolveFn } from '@angular/router';
import type { WordGroup } from '@models/word';
import { WORD_GROUPS } from '@utils/data';

export const wordGroupsResolver: ResolveFn<WordGroup[]> = () => WORD_GROUPS;
