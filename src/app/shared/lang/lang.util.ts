import { LangCode, LANGS } from './lang.constant';

export function getLangLabel(langCode: LangCode): string {
  return LANGS[langCode];
}

export function isLangCode(str?: string): str is LangCode {
  return str != undefined && str in LANGS;
}
