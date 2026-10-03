import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { RegisterWeightData } from '../../models/register.models';
import { WheelSelectorComponent } from '../wheel-selector/wheel-selector.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, WheelSelectorComponent],
  selector: 'app-register-weight',
  styleUrl: './register-weight.component.scss',
  templateUrl: './register-weight.component.html',
})
export class RegisterWeightComponent {
  readonly next = output<RegisterWeightData>();

  selectedWeight = signal<number>(115);
  isValid = computed(() => this.selectedWeight() > 0);

  onNext(): void {
    this.next.emit({ weight: this.selectedWeight() });
  }
}
