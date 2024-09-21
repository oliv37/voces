import { WordsFormDirection } from './words-exercice.model';

export interface WordsSetting {
  formDirection: WordsFormDirection;
}

export const DEFAULT_SETTING: WordsSetting = {
  formDirection: 'FR-ES',
};
