import type { LangCode } from '@shared/lang/lang.constant';

export interface HomeLang {
  langCode: LangCode;
  langLabel: string;
  nbWords: number;
}
