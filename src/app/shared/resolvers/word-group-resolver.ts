import { ResolveFn } from '@angular/router';
import type { WordGroup } from '../models/word';
import { WORD_GROUPS } from '../utils/data';

export const wordGroupResolver: ResolveFn<WordGroup> = async (route) => {
  const id = route.paramMap.get('id');
  const wordGroups = await WORD_GROUPS;
  return wordGroups.find((g) => g.id.toString() === id)!;
};
