import { Component, input, output } from '@angular/core';
import { Exercise } from '../../models/exercises.model';
import { YoutubeFallbackDirective } from '../../../../shared/directives/youtube-fallback.directive';
import { YoutubeThumbnailPipe } from '../../../../shared/pipes/youtube-thumbnail.pipe';

@Component({
  imports: [YoutubeFallbackDirective, YoutubeThumbnailPipe],
  selector: 'app-exercise-card',
  styleUrl: './exercise-card.component.scss',
  templateUrl: './exercise-card.component.html',
})
export class ExerciseCardComponent {
  exercise = input.required<Exercise>();
  isActive = input<boolean>(false);

  onClick = output<Exercise>();

  handleClick(): void {
    this.onClick.emit(this.exercise());
  }
}
