import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { LucideMenu, LucideUser, LucideX } from '@lucide/angular';
import { AuthService } from '../../../core/auth/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [
    RouterLink,
    RouterLinkActive,
    ButtonComponent,
    LucideUser,
    LucideX,
    LucideMenu,
    TranslatePipe
  ],
  selector: 'app-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private readonly _authService = inject(AuthService)

  styleClass = input<string>('');

  isMenuOpen = signal(false);
  isAuthenticated = this._authService.isAuthenticated

  ngOnInit(): void {
    console.log(this.isAuthenticated());
  }

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
