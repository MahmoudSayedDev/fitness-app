import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { MY_TOKEN } from '../../../core/tokens/app-config.token';
import { LoginReq } from '../models/login.interface';
import { RegisterReq, RegisterRes } from '../models/register.interface';
import { User } from '../models/profile-data.interface';
import { AuthService } from './auth.service';

const API = 'https://api.test/v1';

const mockUser: User = {
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
};

const mockAuthResponse: RegisterRes = {
  message: 'success',
  user: mockUser,
  token: 'jwt-token',
};

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let cookieService: { set: ReturnType<typeof vi.fn>; get: ReturnType<typeof vi.fn>; delete: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    cookieService = {
      set: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MY_TOKEN, useValue: API },
        { provide: CookieService, useValue: cookieService },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    const credentials: LoginReq = {
      email: 'jane@example.com',
      password: 'Password1!',
    };

    it('posts credentials to /auth/signin', () => {
      service.login(credentials).subscribe();

      const req = httpMock.expectOne(`${API}/auth/signin`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(credentials);
      req.flush(mockAuthResponse);
    });

    it('stores the token and current user on success', async () => {
      const responsePromise = firstValueFrom(service.login(credentials));

      httpMock.expectOne(`${API}/auth/signin`).flush(mockAuthResponse);

      await expect(responsePromise).resolves.toEqual(mockAuthResponse);
      expect(cookieService.set).toHaveBeenCalledWith('token', mockAuthResponse.token);
      await expect(firstValueFrom(service.currentUser$)).resolves.toEqual(mockUser);
      await expect(firstValueFrom(service.isAuthenticated$)).resolves.toBe(true);
    });

    it('does not store auth state when the request fails', () => {
      service.login(credentials).subscribe({
        error: () => undefined,
      });

      httpMock.expectOne(`${API}/auth/signin`).flush(
        { error: 'Invalid credentials' },
        { status: 401, statusText: 'Unauthorized' },
      );

      expect(cookieService.set).not.toHaveBeenCalled();
    });
  });

  describe('register', () => {
    const payload: RegisterReq = {
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

    it('posts registration data to /auth/signup', () => {
      service.register(payload).subscribe();

      const req = httpMock.expectOne(`${API}/auth/signup`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);
      req.flush(mockAuthResponse);
    });

    it('does not persist the token itself after signup', async () => {
      const responsePromise = firstValueFrom(service.register(payload));

      httpMock.expectOne(`${API}/auth/signup`).flush(mockAuthResponse);

      await expect(responsePromise).resolves.toEqual(mockAuthResponse);
      expect(cookieService.set).not.toHaveBeenCalled();
      await expect(firstValueFrom(service.currentUser$)).resolves.toBeNull();
    });
  });

  describe('getToken', () => {
    it('reads the token from cookies', () => {
      cookieService.get.mockReturnValue('stored-token');

      expect(service.getToken()).toBe('stored-token');
      expect(cookieService.get).toHaveBeenCalledWith('token');
    });
  });
});
