import { ResolveFn } from '@angular/router';
import type { WordGroup } from './word.model';
import { WORD_GROUPS_PROMISE } from './word-data';

export const wordGroupResolver: ResolveFn<WordGroup> = async (route) => {
  const id = route.paramMap.get('id');
  const wordGroups = await WORD_GROUPS_PROMISE;
  return wordGroups.find((g) => g.id.toString() === id)!;
};
