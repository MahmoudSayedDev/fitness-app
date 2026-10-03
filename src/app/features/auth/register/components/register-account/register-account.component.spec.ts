import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RegisterAccountComponent } from './register-account.component';

describe('RegisterAccountComponent', () => {
  let component: RegisterAccountComponent;
  let fixture: ComponentFixture<RegisterAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAccountComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterAccountComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not emit next when the account form is invalid', () => {
    const nextSpy = vi.fn();
    component.next.subscribe(nextSpy);

    component.submit();

    expect(nextSpy).not.toHaveBeenCalled();
    expect(component.form.touched).toBe(true);
  });

  it('does not emit when passwords do not match', () => {
    const nextSpy = vi.fn();
    component.next.subscribe(nextSpy);

    component.form.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      password: 'Password1!',
      rePassword: 'Password2!',
    });

    component.submit();

    expect(component.form.invalid).toBe(true);
    expect(nextSpy).not.toHaveBeenCalled();
  });

  it('emits account data when the form is valid', () => {
    const nextSpy = vi.fn();
    component.next.subscribe(nextSpy);

    const account = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      password: 'Password1!',
      rePassword: 'Password1!',
    };

    component.form.setValue(account);
    component.submit();

    expect(nextSpy).toHaveBeenCalledWith(account);
  });
});
