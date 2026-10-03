import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { RegisterAgeData } from '../../models/register.models';
import { WheelSelectorComponent } from '../wheel-selector/wheel-selector.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, WheelSelectorComponent],
  selector: 'app-register-age',
  styleUrl: './register-age.component.scss',
  templateUrl: './register-age.component.html',
})
export class RegisterAgeComponent {
  readonly next = output<RegisterAgeData>();

  selectedAge = signal<number>(31);
  isValid = computed(() => this.selectedAge() >= 18);

  onAgeChange(val: number): void {
    this.selectedAge.set(val);
  }

  onNext(): void {
    this.next.emit({ age: this.selectedAge() });
  }
}
