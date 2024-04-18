export type LangCode = (typeof LANG_CODES)[number];

export const LANG_CODES = ['en', 'es'] as const;

export const LANG_LABELS: Record<LangCode, string> = {
  en: 'Anglais',
  es: 'Espagnol',
};
