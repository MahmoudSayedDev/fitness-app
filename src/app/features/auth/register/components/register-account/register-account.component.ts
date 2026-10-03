import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideUser, LucideMail, LucideLock } from '@lucide/angular';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { FieldErrorComponent } from '../../../../../shared/components/field-error/field-error.component';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { AuthSwitcherComponent } from '../../../components/auth-switcher/auth-switcher.component';
import { AuthTitleComponent } from '../../../components/auth-title/auth-title.component';
import { RegisterAccountData } from '../../models/register.models';
import { VALIDATION_PATTERNS } from '../../../../../core/validators/patterns';
import { CustomValidators } from '../../../../../core/validators/custom-validators';

@Component({
  imports: [
    AuthTitleComponent,
    InputComponent,
    ReactiveFormsModule,
    LucideUser,
    LucideMail,
    LucideLock,
    FieldErrorComponent,
    ButtonComponent,
    AuthSwitcherComponent,
  ],
  selector: 'app-register-account',
  styleUrl: './register-account.component.scss',
  templateUrl: './register-account.component.html',
})
export class RegisterAccountComponent {
  private _fb = inject(FormBuilder);

  readonly next = output<RegisterAccountData>();
  serverError = input<string>('');

  form = this._fb.nonNullable.group(
    {
      firstName: ['', { nonNullable: true, validators: [Validators.required] }],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.password)]],
      rePassword: ['', [Validators.required]],
    },
    { validators: CustomValidators.matchFields('password', 'rePassword') },
  );

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, password, rePassword } = this.form.getRawValue();

    this.next.emit({
      firstName,
      lastName,
      email,
      password,
      rePassword,
    });
  }
}
