import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { RegisterHeightData } from '../../models/register.models';
import { WheelSelectorComponent } from '../wheel-selector/wheel-selector.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, WheelSelectorComponent],
  selector: 'app-register-height',
  styleUrl: './register-height.component.scss',
  templateUrl: './register-height.component.html',
})
export class RegisterHeightComponent {
  readonly next = output<RegisterHeightData>();

  selectedHeight = signal<number>(175);
  isValid = computed(() => this.selectedHeight() > 0);

  onNext(): void {
    this.next.emit({ height: this.selectedHeight() });
  }
}
