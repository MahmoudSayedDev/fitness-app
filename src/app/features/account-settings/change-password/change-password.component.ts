import { Component, DestroyRef, inject, model, OnInit, signal } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FieldErrorComponent } from '../../../shared/components/field-error/field-error.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { VALIDATION_PATTERNS } from '../../../core/validators/patterns';
import { AuthService } from '../../../core/auth/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [
    InputComponent,
    FieldErrorComponent,
    ButtonComponent,
    ReactiveFormsModule,
    TranslatePipe
  ],
  selector: 'app-change-password',
  styleUrl: './change-password.component.scss',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {

  private _authService = inject(AuthService)
  private readonly destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder)

  form!: FormGroup

  visible = model<boolean>(false);
  formSubmited = signal<boolean>(false)
  errorMsg = signal<string>('')

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.password)]]
    })
  }

  submit() {
    this.formSubmited.set(true)

    if (this.form.invalid) {
      return
    }

    this._authService.changePassword(this.form.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.visible.set(false)
        this.formSubmited.set(false)
      }, error: (err) => {
        console.log(err);
        this.errorMsg.set(err.error.error)
        this.formSubmited.set(false)
      }
    })
  }
}
