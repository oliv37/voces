import { Word } from '../word.model';

export const LEVELS = [1, 2] as const;

export const FINAL_LEVEL = LEVELS[LEVELS.length - 1];

export type Level = (typeof LEVELS)[number];

export interface State {
  words: Word[];
  wordIdx: number;
  level: Level;
  hasUsedHelp: boolean;
  isCompleted: boolean;
}
