import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem } from 'primeng/api';
import { ThemeSwitcherService } from '../../components/theme-switcher/services/theme-switcher.service';
import { LanguageSwitcherService } from '../../components/language-switcher/services/language-switcher.service';

@Component({
  imports: [
    HeaderComponent,
    RouterOutlet,
    SpeedDialModule
  ],
  selector: 'app-content',
  styleUrl: './content.component.scss',
  templateUrl: './content.component.html',
})
export class ContentComponent {

  private readonly _themeSwitcherService = inject(ThemeSwitcherService)
  private readonly _languageSwitcherService = inject(LanguageSwitcherService)

  items = computed<MenuItem[]>(() => [
    {
      icon: 'pi pi-language font-medium! text-lg!',
      command: () => {
        this._languageSwitcherService.toggleLanguage();
      }
    },
    {
      icon: this._themeSwitcherService.currentTheme() === 'dark' ? 'pi pi-sun font-medium! text-lg!' : 'pi pi-moon font-medium! text-lg!',
      command: () => {
        this._themeSwitcherService.toggleTheme();
      }
    }
  ]);
}
