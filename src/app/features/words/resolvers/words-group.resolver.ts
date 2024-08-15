import { ResolveFn } from '@angular/router';
import { findWordsGroup } from '../utils/words.util';
import { WordsGroup } from '../models/word.model';

export const resolveWordsGroup: ResolveFn<WordsGroup> = (route) => {
  const wordsGroupId = Number(route.paramMap.get('wordsGroupId'));
  return findWordsGroup(wordsGroupId);
};
