import { Word } from './word.model';

export interface Group {
  id: string;
  label: string;
  pathParam: string;
  words: Word[];
}
