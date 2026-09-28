import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideLock, LucideMail } from '@lucide/angular';
import { AuthTitleComponent } from '../components/auth-title/auth-title.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FieldErrorComponent } from '../../../shared/components/field-error/field-error.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../../core/auth/services/auth.service';
import { LoginReq } from '../../../core/auth/models/login.interface';

@Component({
  imports: [
    AuthTitleComponent,
    InputComponent,
    FieldErrorComponent,
    ButtonComponent,
    ReactiveFormsModule,
    RouterLink,
    LucideMail,
    LucideLock,
  ],
  selector: 'app-login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const data: LoginReq = this.loginForm.getRawValue();

    this.authService
      .login(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error?.error ?? err.error?.message ?? 'Something went wrong. Please try again.');
        },
      });
  }
}
