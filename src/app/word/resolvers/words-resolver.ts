import { ResolveFn } from '@angular/router';
import type { Word } from '../models/word';
import { WORDS_PROMISE } from '../datas/word-data';

export const wordsResolver: ResolveFn<Word[]> = () => WORDS_PROMISE;

export const nbWordsResolver: ResolveFn<number> = () =>
  WORDS_PROMISE.then((words) => words.length);
