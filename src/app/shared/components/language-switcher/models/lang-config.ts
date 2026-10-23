export type LangType = 'ar' | 'en';

export interface LangConfig {
  name: string;
  code: LangType;
  dir: 'rtl' | 'ltr';
}

export const LANGUAGES: readonly LangConfig[] = [
  { name: 'العربية', code: 'ar', dir: 'rtl' },
  { name: 'English', code: 'en', dir: 'ltr' },
];
export const DEFAULT_LANG: LangType = 'en';
