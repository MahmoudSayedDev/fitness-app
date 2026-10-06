import { DOCUMENT, inject, Service, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ThemeType } from '../models/theme-config';

@Service()
export class ThemeSwitcherService {

    private readonly _cookieService = inject(CookieService);
    private readonly document = inject(DOCUMENT);

    currentTheme = signal<ThemeType>('light')

    initTheme() {
        this.currentTheme.set(this._cookieService.get('theme') as ThemeType || 'light')
        this.document.documentElement.setAttribute('class', this.currentTheme());
    }

    toggleTheme() {
        this.currentTheme.set(this._cookieService.get('theme') as ThemeType || 'light')
        const nextTheme = signal<ThemeType>(this.currentTheme() === 'light' ? 'dark' : 'light')

        this._cookieService.set('theme', nextTheme(), 90, '/')
        this.document.documentElement.setAttribute('class', nextTheme());

        this.currentTheme.set(nextTheme())
    }
}
