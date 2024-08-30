export interface Word {
  id: number;
  value: string;
  translationFr: string;
}

export interface WordsGroup {
  id: number;
  words: Word[];
}

export type CompletionAge =
  | 'LESS_THAN_TWO_DAYS'
  | 'LESS_THAN_FOUR_DAYS'
  | 'LONG_TIME_AGO_OR_NEVER';
