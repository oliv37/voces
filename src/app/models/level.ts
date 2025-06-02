export const LEVEL_DEBUTANT = 'DEBUTANT';
export const LEVEL_INTERMEDIAIRE = 'INTERMEDIAIRE';
export const LEVEL_AVANCE = 'AVANCE';

export type Level =
  | typeof LEVEL_DEBUTANT
  | typeof LEVEL_INTERMEDIAIRE
  | typeof LEVEL_AVANCE;
