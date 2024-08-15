export interface Word {
  id: number;
  value: string;
  translationFr: string;
}

export interface WordsGroup {
  id: number;
  words: Word[];
}

export enum CompletionAge {
  LESS_THAN_A_DAY,
  LESS_THAN_TWO_DAYS,
  LESS_THAN_THREE_DAYS,
  LONG_TIME_AGO,
  NEVER,
}
