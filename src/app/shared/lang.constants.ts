export type LANG = (typeof LANG_CODES)[number];

export const LANG_CODES = ['en', 'es'] as const;

export const LANG_LABELS: Record<LANG, string> = {
  en: 'Anglais',
  es: 'Espagnol',
};
