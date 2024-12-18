import { Group } from './group.model';

export interface Category {
  id: string;
  label: string;
  pathParam: string;
  groups: Group[];
  nbWords: number;
  bgColor: string;
}
