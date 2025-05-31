import type { Color } from './color';
import type { Group } from './group';
import type { Level } from './level';

export interface Category {
  id: string;
  label: string;
  pathParam: string;
  groups: Group[];
  nbWords: number;
  level: Level;
  color: Color;
}
