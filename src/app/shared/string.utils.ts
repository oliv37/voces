import { LANG, LANG_CODES } from './lang.constants';

export function isLang(str?: string): str is LANG {
  return (
    str != undefined && (LANG_CODES as ReadonlyArray<string>).includes(str)
  );
}

export function isPositiveInteger(str?: string): boolean {
  return str != undefined && /^[1-9]\d*$/.test(str);
}
