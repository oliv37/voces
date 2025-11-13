import { Letter } from './letter';

export interface Word {
  id: number;
  es: string;
  fr: string;
  example?: string;
}

export interface WordGroup {
  id: number;
  words: Word[];
}

// { wordGroupId: completionTimeInMs }
export type WordGroupCompletions = Record<string, number>;

export interface WordValidatorResult {
  isValid: boolean;
  wordLetters: Letter[];
}

export interface WordValidator {
  validate(value: string): WordValidatorResult;
}
