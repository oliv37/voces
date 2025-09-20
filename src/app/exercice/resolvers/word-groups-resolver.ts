import { ResolveFn } from '@angular/router';
import type { WordGroup } from '@shared/models/word';
import { WORD_GROUPS } from '@shared/utils/data';

export const wordGroupsResolver: ResolveFn<WordGroup[]> = () => WORD_GROUPS;
