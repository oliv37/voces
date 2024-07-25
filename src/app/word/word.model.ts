export interface Word {
  id: number;
  value: string;
  translationFr: string;
}

export interface Category {
  id: number;
  words: Word[];
}
