import { Component, inject, input, model, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { User } from '../../../core/auth/models/profile-data.interface';
import { ActivityLevel, Goal, RegistrationData, SelectionItem } from '../../auth/register/models/register.models';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  imports: [
    TranslatePipe,
    ButtonComponent
  ],
  selector: 'app-change-goal-and-level',
  styleUrl: './change-goal-and-level.component.scss',
  templateUrl: './change-goal-and-level.component.html',
})
export class ChangeGoalAndLevelComponent implements OnInit {

  private _authService = inject(AuthService)

  dialogKey = input<string>()
  visible = model<boolean>(false);
  profileData = model<User | null>()

  items = signal<SelectionItem[]>([])
  selected = signal<Goal | ActivityLevel | null>(null);
  formSubmited = signal<boolean>(false)

  ngOnInit(): void {
    this.show()
  }

  show() {
    this.selected.set(null);

    switch (this.dialogKey()) {
      case 'goal':
        this.selected.set(this.profileData()?.goal as Goal || '')
        this.items.set([
          { value: 'Gain weight', label: 'Gain Weight' },
          { value: 'Lose weight', label: 'Lose Weight' },
          { value: 'Get fitter', label: 'Get Fitter' },
          { value: 'Gain more flexible', label: 'Gain More Flexible' },
          { value: 'Learn the basic', label: 'Learn The Basic' },
        ])
        break;
      case 'level':
        this.selected.set(this.profileData()?.activityLevel as ActivityLevel || '')
        this.items.set([
          { value: 'level1', label: 'Sedentary' },
          { value: 'level2', label: 'Lightly Active' },
          { value: 'level3', label: 'Moderately Active' },
          { value: 'level4', label: 'Very Active' },
          { value: 'level5', label: 'Extra Active' },
        ])
        break;
      default:
        break;
    }
  }

  save() {
    this.formSubmited.set(true)
    const selectedValue = this.selected()

    if (selectedValue === null) {
      return;
    }

    const dataToSend: Partial<RegistrationData> = {};

    switch (this.dialogKey()) {
      case 'goal':
        dataToSend.goal = selectedValue as Goal;
        break;
      case 'level':
        dataToSend.activityLevel = selectedValue as ActivityLevel;
        break;
      default:
        break;
    }

    this._authService.updateProfileData(dataToSend).subscribe({
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
