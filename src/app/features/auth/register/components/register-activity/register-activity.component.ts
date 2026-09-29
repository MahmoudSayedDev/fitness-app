import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { ActivityLevel, RegisterActivityData } from '../../models/register.models';
import { StepHeaderComponent } from '../step-header/step-header.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, StepHeaderComponent],
  selector: 'app-register-activity',
  styleUrl: './register-activity.component.scss',
  templateUrl: './register-activity.component.html',
})
export class RegisterActivityComponent {
  readonly next = output<RegisterActivityData>();

  activities: { value: ActivityLevel; label: string }[] = [
    { value: 'level1', label: 'Sedentary' },
    { value: 'level2', label: 'Lightly Active' },
    { value: 'level3', label: 'Moderately Active' },
    { value: 'level4', label: 'Very Active' },
    { value: 'level5', label: 'Extra Active' },
  ];

  selected = signal<ActivityLevel | null>(null);
  isValid = computed(() => this.selected() !== null);

  onNext(): void {
    if (!this.selected()) return;
    this.next.emit({ activityLevel: this.selected()! });
  }
}
