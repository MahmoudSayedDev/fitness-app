import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from '../../shared/components/theme-switcher/theme-switcher.component';

@Component({
  imports: [
    RouterOutlet,
    LanguageSwitcherComponent,
    ThemeSwitcherComponent,
  ],
  selector: 'app-auth',
  styleUrl: './auth.component.scss',
  templateUrl: './auth.component.html',
})
export class AuthComponent {}
