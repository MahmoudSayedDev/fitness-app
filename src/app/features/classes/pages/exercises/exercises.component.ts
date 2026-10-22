import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import type { SwiperContainer } from 'swiper/element';
import type { SwiperOptions } from 'swiper/types';
import { ClassesFacadeService } from '../../services/classes-facade.service';
import { Muscle } from '../../models/classes.model';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Level } from '../../models/levels.models';
import { YoutubeFallbackDirective } from '../../../../shared/directives/youtube-fallback.directive';
import { YoutubeThumbnailPipe } from '../../../../shared/pipes/youtube-thumbnail.pipe';

@Component({
  imports: [ExerciseCardComponent, TranslatePipe, YoutubeFallbackDirective, YoutubeThumbnailPipe],
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
    this.classesFacade.selectMuscle(muscle);
  }

  protected selectLevel(level: Level): void {
    this.classesFacade.selectLevel(level);
  }

  test() {
    console.log('Levels: ', this.classesFacade.levels());
  }

  ngOnInit(): void {
    this.classesFacade.loadMuscles();

    console.log('test');
    this.classesFacade.loadExercisesFromWorkout(this.routeId()!);
    // this.classesFacade.loadWorkoutLevels(this.routeId()!);
  }
}
