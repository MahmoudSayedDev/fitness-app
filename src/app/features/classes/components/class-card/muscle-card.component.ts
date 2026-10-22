import { Component, input, output } from '@angular/core';
import { Muscle } from '../../models/classes.model';

@Component({
  imports: [],
  selector: 'app-muscle-card',
  styleUrl: './muscle-card.component.scss',
  templateUrl: './muscle-card.component.html',
})
export class MuscleCardComponent {
  muscle = input.required<Muscle>();
  explore = output<string>();

  exploreClick(): void {
    this.explore.emit(this.muscle()?._id);
  }
}
