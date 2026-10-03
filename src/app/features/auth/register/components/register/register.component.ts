import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RegisterRes } from '../../../../../core/auth/models/register.interface';
import { AuthService } from '../../../../../core/auth/services/auth.service';
import {
  RegisterAccountData,
  RegisterActivityData,
  RegisterAgeData,
  RegisterGenderData,
  RegisterGoalData,
  RegisterHeightData,
  RegisterWeightData,
  RegistrationData,
} from '../../models/register.models';
import { RegisterFacadeService } from '../../services/register.facade.service';
import { RegisterAccountComponent } from '../register-account/register-account.component';
import { RegisterActivityComponent } from '../register-activity/register-activity.component';
import { RegisterAgeComponent } from '../register-age/register-age.component';
import { RegisterGenderComponent } from '../register-gender/register-gender.component';
import { RegisterGoalComponent } from '../register-goal/register-goal.component';
import { RegisterHeightComponent } from '../register-height/register-height.component';
import { RegisterWeightComponent } from '../register-weight/register-weight.component';
import { StepHeaderComponent } from '../step-header/step-header.component';

@Component({
  animations: [
    trigger('stepTransition', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(-40px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
  imports: [
    RegisterAccountComponent,
    RegisterActivityComponent,
    RegisterAgeComponent,
    RegisterGenderComponent,
    RegisterGoalComponent,
    RegisterHeightComponent,
    RegisterWeightComponent,
    StepHeaderComponent,
  ],
  providers: [RegisterFacadeService],
  selector: 'app-register',
  styleUrl: './register.component.scss',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly registerFacade = inject(RegisterFacadeService);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly tokenKey = 'token';

  currentStep = signal(1);
  readonly totalSteps = 7;
  registerError = signal<string>('');

  stepConfig = computed(() => {
    const configs: Record<number, { title: string; subtitle: string }> = {
      2: {
        title: 'What is your gender?',
        subtitle: 'Help us personalize your experience',
      },
      3: {
        title: 'How old are you?',
        subtitle: 'Your age helps us tailor your plan',
      },
      4: {
        title: 'What is your weight?',
        subtitle: 'We will help you track your progress',
      },
      5: {
        title: 'What is your height?',
        subtitle: 'Used to calculate your body metrics',
      },
      6: {
        title: 'What is your goal?',
        subtitle: 'Choose the goal that fits you best',
      },
      7: {
        title: 'How active are you?',
        subtitle: 'Pick your current activity level',
      },
    };
    return configs[this.currentStep()] ?? { title: '', subtitle: '' };
  });

  onAccountNext(data: RegisterAccountData): void {
    this.registerError.set('');
    this.registerFacade.updateRegistrationData(data);
    this.currentStep.set(2);
  }

  onGenderNext(data: RegisterGenderData): void {
    this.registerFacade.updateRegistrationData(data);
    this.currentStep.set(3);
  }

  onAgeNext(data: RegisterAgeData): void {
    this.registerFacade.updateRegistrationData(data);
    this.currentStep.set(4);
  }

  onWeightNext(data: RegisterWeightData): void {
    this.registerFacade.updateRegistrationData(data);
    this.currentStep.set(5);
  }

  onHeightNext(data: RegisterHeightData): void {
    this.registerFacade.updateRegistrationData(data);
    this.currentStep.set(6);
  }

  onGoalNext(data: RegisterGoalData): void {
    this.registerFacade.updateRegistrationData(data);
    this.currentStep.set(7);
  }

  onActivitySubmit(data: RegisterActivityData): void {
    this.registerFacade.updateRegistrationData(data);

    this.register();
  }

  previousStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update((step) => step - 1);
    }
  }

  private register(): void {
    const data = this.registerFacade.registrationData() as RegistrationData;
    this.authService
      .register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
        gender: data.gender,
        age: data.age,
        weight: data.weight,
        height: data.height,
        goal: data.goal,
        activityLevel: data.activityLevel,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: RegisterRes) => {
          this.registerError.set('');
          this.cookieService.set(this.tokenKey, res.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          const message =
            err?.error?.message || err?.message || 'Registration failed. Please try again.';
          this.registerError.set(message);
          this.registerFacade.reset();
          this.currentStep.set(1);
        },
      });
  }
}
