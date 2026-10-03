import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-step-header',
  styleUrl: './step-header.component.scss',
  templateUrl: './step-header.component.html',
})
export class StepHeaderComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
  currentStep = input.required<number>();
  totalSteps = input.required<number>();

  readonly circumference = 2 * Math.PI * 52;

  dashOffset = computed(() => {
    const progress = this.currentStep() / this.totalSteps();
    return this.circumference * (1 - progress);
  });
}
