import { computed, DOCUMENT, inject, Service, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { DEFAULT_LANG, LANGUAGES, LangConfig, LangType } from '../models/lang-config';

@Service()
export class LanguageSwitcherService {
  private readonly translate = inject(TranslateService);
  private readonly cookies = inject(CookieService);
  private readonly document = inject(DOCUMENT);

  readonly languages = LANGUAGES;

  private readonly _currentLang = signal<LangType>(this.readSavedLang());
  readonly currentLang = this._currentLang.asReadonly();

  readonly selectedLanguage = computed<LangConfig>(
    () => this.languages.find((l) => l.code === this._currentLang()) ?? this.languages[0],
  );

  initLanguage(): void {
    this.setLanguage(this._currentLang());
  }

  toggleLanguage(): void {
    this.setLanguage(this._currentLang() === 'en' ? 'ar' : 'en');
  }

  setLanguage(code: LangType): void {
    const lang = this.languages.find((l) => l.code === code);
    if (!lang) return;

    this.translate.use(lang.code);
    this.cookies.set('lang', lang.code, { expires: 90, path: '/', sameSite: 'Lax' });

    const html = this.document.documentElement;
    html.setAttribute('lang', lang.code);
    html.setAttribute('dir', lang.dir);

    this._currentLang.set(lang.code);
  }

  private readSavedLang(): LangType {
    const saved = this.cookies.get('lang');
    return this.languages.some((l) => l.code === saved) ? (saved as LangType) : DEFAULT_LANG;
  }
}
