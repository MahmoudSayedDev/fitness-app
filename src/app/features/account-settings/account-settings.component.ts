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
import { Router } from '@angular/router';
import { ChangeWeightComponent } from './change-weight/change-weight.component';
import { ChangeGoalAndLevelComponent } from './change-goal-and-level/change-goal-and-level.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

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
    ChangeGoalAndLevelComponent,
    ChangeWeightComponent,
    ChangePasswordComponent
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

  dialogKey = signal('');
  visible = signal<boolean>(false);
  profileData = signal<User | null>(null)

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
    this.visible.set(true)
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
