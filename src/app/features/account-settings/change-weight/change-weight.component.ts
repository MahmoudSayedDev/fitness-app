import { Component, DestroyRef, inject, input, model, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../../core/auth/services/auth.service';
import { WheelSelectorComponent } from '../../auth/register/components/wheel-selector/wheel-selector.component';
import { RegistrationData } from '../../auth/register/models/register.models';
import { User } from '../../../core/auth/models/profile-data.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [
    WheelSelectorComponent,
    ButtonComponent,
    TranslatePipe
  ],
  selector: 'app-change-weight',
  styleUrl: './change-weight.component.scss',
  templateUrl: './change-weight.component.html',
})
export class ChangeWeightComponent {

  private _authService = inject(AuthService)
  private readonly destroyRef = inject(DestroyRef);

  visible = model<boolean>(false);
  profileData = model<User | null>()

  selected = signal<number>(60);
  formSubmited = signal<boolean>(false)

  save() {
    this.formSubmited.set(true)
    const selectedValue = this.selected()

    if (selectedValue === null) {
      return;
    }

    const dataToSend: Partial<RegistrationData> = {
      weight: selectedValue
    };

    this._authService.updateProfileData(dataToSend).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.visible.set(false)
        this.formSubmited.set(false)
        this.profileData.set(res.user)
      }, error: (err) => {
        console.log(err);
        this.visible.set(false)
        this.formSubmited.set(false)
      }
    })
  }
}
