import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { LucideUser } from '@lucide/angular';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  imports: [
    RouterLink,
    RouterLinkActive,
    ButtonComponent,
    LucideUser
  ],
  selector: 'app-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private readonly _authService = inject(AuthService)

  styleClass = input<string>('');

  isAuthenticated = this._authService.isAuthenticated

  ngOnInit(): void {
    console.log(this.isAuthenticated());
  }
}
