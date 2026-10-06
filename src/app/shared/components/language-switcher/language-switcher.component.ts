import { Component, inject, OnInit } from '@angular/core';
import { LanguageSwitcherService } from './services/language-switcher.service';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent implements OnInit {

  private readonly _languageSwitcherService = inject(LanguageSwitcherService);
  selectedLanguage = this._languageSwitcherService.selectedLanguage

  ngOnInit(): void {
    this._languageSwitcherService.initLanguage()
  }

  toggleLanguage() {
    this._languageSwitcherService.toggleLanguage()
  }
}
