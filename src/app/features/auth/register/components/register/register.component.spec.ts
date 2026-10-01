import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../../../../core/auth/services/auth.service';
import { RegisterRes } from '../../../../../core/auth/models/register.interface';
import { RegistrationData } from '../../models/register.models';
import { RegisterFacadeService } from '../../services/register.facade.service';
import { RegisterComponent } from './register.component';

@Component({ selector: 'app-register-account', template: '' })
class RegisterAccountStub {}

@Component({ selector: 'app-register-gender', template: '' })
class RegisterGenderStub {}

@Component({ selector: 'app-register-age', template: '' })
class RegisterAgeStub {}

@Component({ selector: 'app-register-weight', template: '' })
class RegisterWeightStub {}

@Component({ selector: 'app-register-height', template: '' })
class RegisterHeightStub {}

@Component({ selector: 'app-register-goal', template: '' })
class RegisterGoalStub {}

@Component({ selector: 'app-register-activity', template: '' })
class RegisterActivityStub {}

const completeRegistration: RegistrationData = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  password: 'Password1!',
  rePassword: 'Password1!',
  gender: 'female',
  age: 28,
  weight: 60,
  height: 165,
  goal: 'Get fitter',
  activityLevel: 'level2',
};

const mockAuthResponse: RegisterRes = {
  message: 'success',
  token: 'jwt-token',
  user: {
    _id: 'user-1',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    gender: 'female',
    age: 28,
    weight: 60,
    height: 165,
    activityLevel: 'level2',
    goal: 'Get fitter',
    photo: '',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: { register: ReturnType<typeof vi.fn> };
  let cookieService: { set: ReturnType<typeof vi.fn> };
  let router: Router;
  let facade: RegisterFacadeService;

  beforeEach(async () => {
    authService = {
      register: vi.fn(),
    };
    cookieService = {
      set: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authService },
        { provide: CookieService, useValue: cookieService },
      ],
    })
      .overrideComponent(RegisterComponent, {
        set: {
          imports: [
            RegisterAccountStub,
            RegisterGenderStub,
            RegisterAgeStub,
            RegisterWeightStub,
            RegisterHeightStub,
            RegisterGoalStub,
            RegisterActivityStub,
          ],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    facade = fixture.debugElement.injector.get(RegisterFacadeService);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts on the account step', () => {
    expect(component.currentStep()).toBe(1);
    expect(component.totalSteps).toBe(7);
  });

  it('advances through each registration step and stores data', () => {
    component.onAccountNext({
      firstName: completeRegistration.firstName,
      lastName: completeRegistration.lastName,
      email: completeRegistration.email,
      password: completeRegistration.password,
      rePassword: completeRegistration.rePassword,
    });
    expect(component.currentStep()).toBe(2);

    component.onGenderNext({ gender: completeRegistration.gender });
    expect(component.currentStep()).toBe(3);

    component.onAgeNext({ age: completeRegistration.age });
    expect(component.currentStep()).toBe(4);

    component.onWeightNext({ weight: completeRegistration.weight });
    expect(component.currentStep()).toBe(5);

    component.onHeightNext({ height: completeRegistration.height });
    expect(component.currentStep()).toBe(6);

    component.onGoalNext({ goal: completeRegistration.goal });
    expect(component.currentStep()).toBe(7);

    expect(facade.registrationData()).toEqual({
      firstName: completeRegistration.firstName,
      lastName: completeRegistration.lastName,
      email: completeRegistration.email,
      password: completeRegistration.password,
      rePassword: completeRegistration.rePassword,
      gender: completeRegistration.gender,
      age: completeRegistration.age,
      weight: completeRegistration.weight,
      height: completeRegistration.height,
      goal: completeRegistration.goal,
    });
  });

  it('goes back one step and stays on the first step', () => {
    component.onAccountNext({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      password: 'Password1!',
      rePassword: 'Password1!',
    });

    component.previousStep();
    expect(component.currentStep()).toBe(1);

    component.previousStep();
    expect(component.currentStep()).toBe(1);
  });

  it('submits the collected payload, stores the token, and navigates home', () => {
    authService.register.mockReturnValue(of(mockAuthResponse));

    component.onAccountNext({
      firstName: completeRegistration.firstName,
      lastName: completeRegistration.lastName,
      email: completeRegistration.email,
      password: completeRegistration.password,
      rePassword: completeRegistration.rePassword,
    });
    component.onGenderNext({ gender: completeRegistration.gender });
    component.onAgeNext({ age: completeRegistration.age });
    component.onWeightNext({ weight: completeRegistration.weight });
    component.onHeightNext({ height: completeRegistration.height });
    component.onGoalNext({ goal: completeRegistration.goal });
    component.onActivitySubmit({ activityLevel: completeRegistration.activityLevel });

    expect(authService.register).toHaveBeenCalledWith({
      firstName: completeRegistration.firstName,
      lastName: completeRegistration.lastName,
      email: completeRegistration.email,
      password: completeRegistration.password,
      rePassword: completeRegistration.rePassword,
      gender: completeRegistration.gender,
      age: completeRegistration.age,
      weight: completeRegistration.weight,
      height: completeRegistration.height,
      goal: completeRegistration.goal,
      activityLevel: completeRegistration.activityLevel,
    });
    expect(cookieService.set).toHaveBeenCalledWith('token', mockAuthResponse.token);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('does not navigate when registration fails', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    authService.register.mockReturnValue(throwError(() => new Error('Signup failed')));

    component.onAccountNext({
      firstName: completeRegistration.firstName,
      lastName: completeRegistration.lastName,
      email: completeRegistration.email,
      password: completeRegistration.password,
      rePassword: completeRegistration.rePassword,
    });
    component.onGenderNext({ gender: completeRegistration.gender });
    component.onAgeNext({ age: completeRegistration.age });
    component.onWeightNext({ weight: completeRegistration.weight });
    component.onHeightNext({ height: completeRegistration.height });
    component.onGoalNext({ goal: completeRegistration.goal });
    component.onActivitySubmit({ activityLevel: completeRegistration.activityLevel });

    expect(cookieService.set).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
