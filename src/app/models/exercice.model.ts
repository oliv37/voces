export const LEVELS = [1, 2] as const;

export const MAX_LEVEL = LEVELS[LEVELS.length - 1];

export type Level = (typeof LEVELS)[number];

export interface Letter {
  value: string;
  status: 'VALID' | 'INVALID' | 'UNKNOWN';
}
