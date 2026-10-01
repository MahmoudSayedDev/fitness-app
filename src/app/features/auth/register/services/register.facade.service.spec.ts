import { TestBed } from '@angular/core/testing';
import { RegisterFacadeService } from './register.facade.service';

describe('RegisterFacadeService', () => {
  let service: RegisterFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterFacadeService],
    });
    service = TestBed.inject(RegisterFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('starts with empty registration data', () => {
    expect(service.registrationData()).toEqual({});
    expect(service.isDirty()).toBe(false);
  });

  it('merges step data into the registration payload', () => {
    service.updateRegistrationData({ firstName: 'Jane', lastName: 'Doe' });
    service.updateRegistrationData({ email: 'jane@example.com', gender: 'female' });

    expect(service.registrationData()).toEqual({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      gender: 'female',
    });
    expect(service.isDirty()).toBe(true);
  });

  it('resets accumulated registration data', () => {
    service.updateRegistrationData({ firstName: 'Jane' });
    service.reset();

    expect(service.registrationData()).toEqual({});
    expect(service.isDirty()).toBe(false);
  });
});
