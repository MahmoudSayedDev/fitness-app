import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth.service';
import { RegisterRes } from '../../../core/auth/models/register.interface';
import { LoginComponent } from './login.component';

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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: { login: ReturnType<typeof vi.fn> };
  let router: Router;

  beforeEach(async () => {
    authService = {
      login: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts with an empty invalid form and no error', () => {
    expect(component.loginForm.invalid).toBe(true);
    expect(component.isLoading()).toBe(false);
    expect(component.errorMessage()).toBeNull();
  });

  it('does not call login when the form is invalid', () => {
    component.submit();

    expect(authService.login).not.toHaveBeenCalled();
    expect(component.loginForm.controls.email.touched).toBe(true);
    expect(component.loginForm.controls.password.touched).toBe(true);
  });

  it('rejects an invalid email', () => {
    component.loginForm.setValue({
      email: 'not-an-email',
      password: 'secret',
    });

    component.submit();

    expect(authService.login).not.toHaveBeenCalled();
    expect(component.loginForm.controls.email.invalid).toBe(true);
  });

  it('logs in with the form values and navigates home on success', () => {
    const login$ = new Subject<RegisterRes>();
    authService.login.mockReturnValue(login$.asObservable());

    component.loginForm.setValue({
      email: 'jane@example.com',
      password: 'Password1!',
    });

    component.submit();

    expect(component.isLoading()).toBe(true);
    expect(component.errorMessage()).toBeNull();
    expect(authService.login).toHaveBeenCalledWith({
      email: 'jane@example.com',
      password: 'Password1!',
    });

    login$.next(mockAuthResponse);
    login$.complete();

    expect(component.isLoading()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('shows the API error message when login fails', () => {
    authService.login.mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 401,
            error: { error: 'Invalid credentials' },
          }),
      ),
    );

    component.loginForm.setValue({
      email: 'jane@example.com',
      password: 'wrong-password',
    });

    component.submit();

    expect(component.isLoading()).toBe(false);
    expect(component.errorMessage()).toBe('Invalid credentials');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('falls back to message or a default when the error shape varies', () => {
    authService.login.mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: { message: 'Email not found' },
          }),
      ),
    );

    component.loginForm.setValue({
      email: 'missing@example.com',
      password: 'Password1!',
    });
    component.submit();

    expect(component.errorMessage()).toBe('Email not found');

    authService.login.mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 500,
            error: {},
          }),
      ),
    );

    component.submit();

    expect(component.errorMessage()).toBe('Something went wrong. Please try again.');
  });

  it('clears a previous error before retrying', () => {
    component.errorMessage.set('Previous error');
    authService.login.mockReturnValue(of(mockAuthResponse));

    component.loginForm.setValue({
      email: 'jane@example.com',
      password: 'Password1!',
    });

    component.submit();

    expect(component.errorMessage()).toBeNull();
  });
});
