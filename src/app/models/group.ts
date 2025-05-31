import type { Category } from './category';
import type { Word } from './word';

export interface Group {
  id: string;
  label: string;
  pathParam: string;
  words: Word[];
  category: Category;
}
