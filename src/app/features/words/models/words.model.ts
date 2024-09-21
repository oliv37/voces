export interface WordsCategory {
  id: string;
  label: string;
  pathParam: string;
  nbWords: number;
  wordsGroups: WordsGroup[];
}

export interface WordsGroup {
  id: string;
  pathParam: string;
  words: Word[];
}

export interface Word {
  id: number;
  value: string;
  translationFr: string;
}
