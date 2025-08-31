export interface Word {
  id: number;
  es: string;
  fr: string;
}

export interface WordGroup {
  id: number;
  words: Word[];
}

// { wordGroupId: completionTimestampInMs }
export type WordGroupCompletion = Record<string, number>;
