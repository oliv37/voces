export type WordsFormDirection = 'FR-ES' | 'ES-FR';
export type WordsStep = (typeof STEPS)[number];

export const STEPS = ['preview', 'form'] as const;

export const FIRST_STEP = STEPS[0];
export const NB_WORDS_IN_EXERCICE = 10;
