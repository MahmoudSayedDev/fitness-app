import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ThemeSwitcherService } from './shared/components/theme-switcher/services/theme-switcher.service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('fitness-app');

  private readonly _translateService = inject(TranslateService)
  private readonly _themeSwitcherService = inject(ThemeSwitcherService)
  private readonly _cookieService = inject(CookieService);

  constructor() {
    this._translateService.addLangs(['ar', 'en']);
    this._translateService.setFallbackLang(this._cookieService.get('lang') || 'en');
    this._translateService.use(this._cookieService.get('lang') || 'en');

    afterNextRender(() => {
      const root = document.documentElement
      root.setAttribute('lang', this._translateService.getCurrentLang()!)
      root.setAttribute('dir', this._translateService.getCurrentLang() == 'ar' ? 'rtl' : 'ltr')

      this._themeSwitcherService.initTheme()
    })
  }
}
