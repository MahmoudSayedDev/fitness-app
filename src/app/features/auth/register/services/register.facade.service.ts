import { Injectable, Service, signal } from '@angular/core';
import { RegistrationData } from '../models/register.models';

@Injectable()
export class RegisterFacadeService {
  private _registrationData = signal<Partial<RegistrationData>>({});
  readonly registrationData = this._registrationData.asReadonly();

  private readonly _isDirty = signal(false);
  readonly isDirty = this._isDirty.asReadonly();

  updateRegistrationData(data: Partial<RegistrationData>): void {
    this._registrationData.update((current) => ({
      ...current,
      ...data,
    }));

    this._isDirty.set(true);
  }

  markDirty(): void {
    this._isDirty.set(true);
  }

  markClean(): void {
    this._isDirty.set(false);
  }

  reset(): void {
    this._registrationData.set({});
    this._isDirty.set(false);
  }
}
