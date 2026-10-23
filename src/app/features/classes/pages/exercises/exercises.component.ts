import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ClassesFacadeService } from '../../services/classes-facade.service';
import { Muscle } from '../../models/classes.model';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Level } from '../../models/levels.models';
import { Exercise } from '../../models/exercises.model';
import { RecommendedMealsComponent } from '../../components/recommended-meals/recommended-meals.component';
import { YoutubePlayerComponent } from '../../components/youtube-player/youtube-player.component';
import { MarqueeBannerComponent } from '../../../../shared/components/marquee-banner/marquee-banner.component';
import { FooterComponent } from '../../../../shared/layout/footer/footer.component';

@Component({
  imports: [
    ExerciseCardComponent,
    TranslatePipe,
    RecommendedMealsComponent,
    YoutubePlayerComponent,
    MarqueeBannerComponent,
    FooterComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-exercises',
  styleUrl: './exercises.component.scss',
  templateUrl: './exercises.component.html',
})
export class ExercisesComponent implements OnInit {
  protected readonly classesFacade = inject(ClassesFacadeService);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly routeId = toSignal(
    this.activatedRoute.paramMap.pipe(map((param) => param.get('id'))),
  );

  protected selectMuscle(muscle: Muscle): void {
    this.classesFacade.selectMuscle(muscle, true);
  }

  protected selectWorkout(workout: Muscle): void {
    this.classesFacade.selectWorkout(workout, true);
  }

  protected selectLevel(level: Level): void {
    this.classesFacade.selectLevel(level, this.routeId()!);
  }

  protected selectExercise(exercise: Exercise): void {
    this.classesFacade.selectExercise(exercise);
  }

  ngOnInit(): void {
    this.classesFacade.loadMuscles(true);

    this.classesFacade.loadWorkoutLevels(this.routeId()!, true);
  }
}
