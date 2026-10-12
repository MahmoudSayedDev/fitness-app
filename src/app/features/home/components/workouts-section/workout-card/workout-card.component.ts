import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-workout-card',
  styleUrl: './workout-card.component.scss',
  templateUrl: './workout-card.component.html',
})
export class WorkoutCardComponent {
  imageUrl = input.required<string>();
  title = input.required<string>();
  explore = output<void>();
}
