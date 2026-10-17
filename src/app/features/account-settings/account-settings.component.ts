import { Component, inject, OnInit, signal } from '@angular/core';
import { LucideCircleArrowOutUpRight, LucideCog, LucideGlobe, LucideLifeBuoy, LucideRefreshCw, LucideShieldAlert, LucideSunMoon } from '@lucide/angular';
import { LanguageSwitcherService } from '../../shared/components/language-switcher/services/language-switcher.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { ThemeSwitcherService } from '../../shared/components/theme-switcher/services/theme-switcher.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { User } from '../../core/auth/models/profile-data.interface';
import { NgClass } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Router } from '@angular/router';
import { ActivityLevel, Goal, RegistrationData, SelectionItem } from '../auth/register/models/register.models';

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
    FormsModule,
    NgClass,
    DialogModule,
    ButtonComponent
  ],
  selector: 'app-account-settings',
  styleUrl: './account-settings.component.scss',
  templateUrl: './account-settings.component.html',
})
export class AccountSettingsComponent implements OnInit {

  private _languageSwitcherService = inject(LanguageSwitcherService)
  private _themeSwitcherService = inject(ThemeSwitcherService)
  private _authService = inject(AuthService)
  private _router = inject(Router)

  profileData = signal<User | null>(null)

  visible: boolean = false;
  dialogKey = signal('goal');
  items = signal<SelectionItem[]>([])
  selected = signal<Goal | ActivityLevel | null>(null);
  formSubmited = signal<boolean>(false)

  checked = signal<boolean>(false);
  currentTheme = this._themeSwitcherService.currentTheme;

  ngOnInit(): void {
    this.checked.set(this.currentTheme() == 'dark')

    this.getProfileData()
  }

  getProfileData() {
    this._authService.getProfileData().subscribe({
      next: (res) => {
        this.profileData.set(res.user)
        this.profileData()
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  showDialog(key: string) {
    this.dialogKey.set(key);
    this.selected.set(null);
    this.visible = true

    switch (key) {
      case 'goal':
        this.items.set([
          { value: 'Gain weight', label: 'Gain Weight' },
          { value: 'Lose weight', label: 'Lose Weight' },
          { value: 'Get fitter', label: 'Get Fitter' },
          { value: 'Gain more flexible', label: 'Gain More Flexible' },
          { value: 'Learn the basic', label: 'Learn The Basic' },
        ])
        break;
      case 'level':
        this.items.set([
          { value: 'level1', label: 'Sedentary' },
          { value: 'level2', label: 'Lightly Active' },
          { value: 'level3', label: 'Moderately Active' },
          { value: 'level4', label: 'Very Active' },
          { value: 'level5', label: 'Extra Active' },
        ])
        break;

      default:
        break;
    }
  }

  updateProfileData() {
    this.formSubmited.set(true)
    const selectedValue = this.selected();

    if (selectedValue === null) {
      return;
    }

    const dataToSend: Partial<RegistrationData> = {};

    switch (this.dialogKey()) {
      case 'goal':
        dataToSend.goal = selectedValue as Goal;
        break;
      case 'level':
        dataToSend.activityLevel = selectedValue as ActivityLevel;
        break;

      default:
        break;
    }

    this._authService.updateProfileData(dataToSend).subscribe({
      next: (res) => {
        this.visible = false
        this.formSubmited.set(false)
        this.profileData.set(res.user)
      }, error: (err) => {
        console.log(err);
        this.visible = false
        this.formSubmited.set(false)
      }
    })
  }

  toggleLanguage() {
    this._languageSwitcherService.toggleLanguage()
  }

  toggleTheme() {
    this._themeSwitcherService.toggleTheme()
  }

  logout() {
    this._authService.logout().subscribe({
      next: () => {
        this._router.navigate(['/'])
      }
    })
  }
}
