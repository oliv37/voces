import { LangCode, LANG_LABELS, LANG_CODES } from '../constants/lang.constants';

export function getLangLabel(langCode: LangCode): string {
  return LANG_LABELS[langCode];
}

export function isLangCode(str?: string): str is LangCode {
  return (
    str != undefined && (LANG_CODES as ReadonlyArray<string>).includes(str)
  );
}
