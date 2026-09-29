import { Component, inject, signal } from '@angular/core';
import {
  RegisterAccountData,
  RegisterActivityData,
  RegisterAgeData,
  RegisterGenderData,
  RegisterGoalData,
  RegisterHeightData,
  RegisterWeightData,
} from '../../models/register.models';
import { RegisterFacadeService } from '../../services/register.facade.service';
import { RegisterAccountComponent } from '../register-account/register-account.component';

@Component({
  imports: [RegisterAccountComponent],
  providers: [RegisterFacadeService],
  selector: 'app-register',
  styleUrl: './register.component.scss',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private registerFacade = inject(RegisterFacadeService);

  currentStep = signal(1);
  readonly totalSteps = 7;

  onAccountNext(data: RegisterAccountData): void {
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
    const data = this.registerFacade.registrationData();
    // API call will come here.
  }
}
