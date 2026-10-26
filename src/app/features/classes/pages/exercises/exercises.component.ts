import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ClassesFacadeService } from '../../services/classes-facade.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { RecommendedMealsComponent } from '../../components/recommended-meals/recommended-meals.component';
import { YoutubePlayerComponent } from '../../components/youtube-player/youtube-player.component';

@Component({
  imports: [
    ExerciseCardComponent,
    TranslatePipe,
    RecommendedMealsComponent,
    YoutubePlayerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-exercises',
  styleUrl: './exercises.component.scss',
  templateUrl: './exercises.component.html',
})
export class ExercisesComponent {
  protected readonly classesFacade = inject(ClassesFacadeService);
  private readonly activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((id): id is string => !!id),
        takeUntilDestroyed(),
      )
      .subscribe((id) => this.classesFacade.selectWorkout(id));
  }

  protected selectMuscle(muscleId: string): void {
    this.classesFacade.selectMuscle(muscleId);
  }

  protected selectWorkout(workoutId: string): void {
    this.classesFacade.selectWorkout(workoutId);
  }

  protected selectLevel(levelId: string): void {
    this.classesFacade.selectLevel(levelId);
  }

  protected selectExercise(exerciseId: string): void {
    this.classesFacade.selectExercise(exerciseId);
  }
}
