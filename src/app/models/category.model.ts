import { Color } from './color.model';
import { Group } from './group.model';
import { Level } from './level.model';

export interface Category {
  id: string;
  label: string;
  pathParam: string;
  groups: Group[];
  nbWords: number;
  level: Level;
  color: Color;
}
