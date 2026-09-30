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

  ringStyle = computed(() => {
    const percent = (this.currentStep() / this.totalSteps()) * 100;
    return `background: conic-gradient(
      #FF4100 0% ${percent}%,
      #333333 ${percent}% 100%
    )`;
  });
}
