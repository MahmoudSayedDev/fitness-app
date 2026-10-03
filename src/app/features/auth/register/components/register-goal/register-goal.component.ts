import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { Goal, RegisterGoalData } from '../../models/register.models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
  selector: 'app-register-goal',
  styleUrl: './register-goal.component.scss',
  templateUrl: './register-goal.component.html',
})
export class RegisterGoalComponent {
  readonly next = output<RegisterGoalData>();

  goals: { value: Goal; label: string }[] = [
    { value: 'Gain weight', label: 'Gain Weight' },
    { value: 'Lose weight', label: 'Lose Weight' },
    { value: 'Get fitter', label: 'Get Fitter' },
    { value: 'Gain more flexible', label: 'Gain More Flexible' },
    { value: 'Learn the basic', label: 'Learn The Basic' },
  ];

  selected = signal<Goal | null>(null);
  isValid = computed(() => this.selected() !== null);

  onNext(): void {
    if (!this.selected()) return;
    this.next.emit({ goal: this.selected()! });
  }
}
