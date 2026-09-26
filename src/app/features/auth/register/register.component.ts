import { Component } from '@angular/core';
import { AuthTitleComponent } from '../components/auth-title/auth-title.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideLock, LucideMail, LucideUser } from '@lucide/angular';
import { FieldErrorComponent } from '../../../shared/components/field-error/field-error.component';

@Component({
  imports: [AuthTitleComponent, InputComponent, ReactiveFormsModule, LucideUser, LucideMail, LucideLock, FieldErrorComponent],
  selector: 'app-register',
  styleUrl: './register.component.scss',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  testform: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    ]),
  });
}
