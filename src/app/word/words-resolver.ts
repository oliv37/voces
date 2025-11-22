import { ResolveFn } from '@angular/router';
import type { Word } from './word.model';
import { WORDS_PROMISE } from './word-data';

export const wordsResolver: ResolveFn<Word[]> = () => WORDS_PROMISE;

export const nbWordsResolver: ResolveFn<number> = () =>
  WORDS_PROMISE.then((words) => words.length);
