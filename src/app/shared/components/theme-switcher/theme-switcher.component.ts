import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ThemeSwitcherService } from './services/theme-switcher.service';
import { LucideMoon, LucideSun } from '@lucide/angular';

@Component({
  selector: 'app-theme-switcher',
  imports: [
    LucideSun,
    LucideMoon
  ],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent implements OnInit { 

  private readonly _themeSwitcherService = inject(ThemeSwitcherService)

  styleClass = input<string>('')

  currentTheme = this._themeSwitcherService.currentTheme

  ngOnInit(): void {
    this._themeSwitcherService.initTheme()
  }

  toggleTheme() {
    this._themeSwitcherService.toggleTheme()
  }
}
