import { DOCUMENT, inject, Service, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { LangType, LangConfig } from '../models/lang-config';

@Service()
export class LanguageSwitcherService {

    private readonly _translateService = inject(TranslateService);
    private readonly _cookieService = inject(CookieService);
    private readonly document = inject(DOCUMENT);

    languages = signal<LangConfig[]>([])
    selectedLanguage = signal<LangConfig | null>(null)
    currentLang = signal<LangType>('en');

    initLanguage() {
        this.languages.set([
            {
                name: 'العربية',
                code: 'ar',
            },
            {
                name: 'English',
                code: 'en',
            }
        ]);

        this.selectedLanguage.update(val => this._translateService.getCurrentLang() === 'en' ? val = this.languages()[0] : val = this.languages()[1])
    }

    toggleLanguage() {
        this.currentLang.set(this._translateService.getCurrentLang() as LangType)
        const nextLang = signal<string>(this.currentLang() === 'en' ? 'ar' : 'en')

        this._translateService.use(nextLang());
        this._cookieService.set('lang', nextLang(), 90, '/');

        this.document.documentElement.setAttribute('lang', nextLang());
        this.document.documentElement.setAttribute('dir', nextLang() === 'ar' ? 'rtl' : 'ltr');

        this.selectedLanguage.set(nextLang() === 'en' ? this.languages()[0] : this.languages()[1]);
    }
}
