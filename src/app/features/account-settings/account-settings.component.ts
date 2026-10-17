import { Component, inject, OnInit, signal } from '@angular/core';
import { LucideCircleArrowOutUpRight, LucideCog, LucideGlobe, LucideLifeBuoy, LucideRefreshCcw, LucideRefreshCw, LucideShieldAlert, LucideSunMoon } from '@lucide/angular';
import { LanguageSwitcherService } from '../../shared/components/language-switcher/services/language-switcher.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { ThemeSwitcherService } from '../../shared/components/theme-switcher/services/theme-switcher.service';

@Component({
  imports: [
    TranslatePipe,
    LucideRefreshCw,
    LucideGlobe,
    LucideSunMoon,
    LucideCog,
    LucideShieldAlert,
    ToggleSwitchModule,
    LucideLifeBuoy,
    LucideCircleArrowOutUpRight,
    FormsModule
  ],
  selector: 'app-account-settings',
  styleUrl: './account-settings.component.scss',
  templateUrl: './account-settings.component.html',
})
export class AccountSettingsComponent implements OnInit {

  private _languageSwitcherService = inject(LanguageSwitcherService)
  private _themeSwitcherService = inject(ThemeSwitcherService)

  checked = signal<boolean>(false);
  currentTheme = this._themeSwitcherService.currentTheme;

  ngOnInit(): void {
    this.checked.set(this.currentTheme() == 'dark')
  }

  toggleLanguage() {
    this._languageSwitcherService.toggleLanguage()
  }

  toggleTheme() {
    console.log('test');
    
    this._themeSwitcherService.toggleTheme()
  }
}
