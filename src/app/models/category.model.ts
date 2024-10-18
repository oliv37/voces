import { Group } from './group.model';

export interface Category {
  id: string;
  label: string;
  pathParam: string;
  nbWords: number;
  groups: Group[];
}
