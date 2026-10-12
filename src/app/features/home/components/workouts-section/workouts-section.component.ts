import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { register } from 'swiper/element/bundle';
import { MY_TOKEN } from '../../../../core/tokens/app-config.token';
import { WorkoutCardComponent } from './workout-card/workout-card.component';

export interface Muscle {
  _id: string;
  name: string;
}

export interface MuscleGroupWorkout {
  _id: string;
  title: string;
  image: string;
}

interface MusclesResponse {
  message: string;
  musclesGroup: Muscle[];
}

interface MuscleGroupResponse {
  message: string;
  muscleGroup: Muscle;
  muscles: { _id: string; name: string; image: string }[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WorkoutCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-workouts-section',
  styleUrl: './workouts-section.component.scss',
  templateUrl: './workouts-section.component.html',
})
export class WorkoutsSectionComponent {
  private readonly http = inject(HttpClient);
  private readonly api = inject(MY_TOKEN);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  muscles = signal<Muscle[]>([]);
  workouts = signal<MuscleGroupWorkout[]>([]);
  selectedMuscle = signal<Muscle | null>(null);
  isLoadingMuscles = signal<boolean>(false);
  isLoadingWorkouts = signal<boolean>(false);
  activeSlideIndex = signal<number>(0);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      register();
    }
    this.loadMuscles();
  }

  loadMuscles(): void {
    this.isLoadingMuscles.set(true);

    this.http
      .get<MusclesResponse>(`${this.api}/muscles`, {
        headers: { 'accept-language': 'ar' },
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          const list = res.musclesGroup ?? [];
          this.muscles.set(list);
          this.isLoadingMuscles.set(false);

          if (list.length > 0) {
            this.selectedMuscle.set(list[0]);
            this.loadWorkouts(list[0]._id);
          }
        },
        error: () => {
          this.isLoadingMuscles.set(false);
        },
      });
  }

  loadWorkouts(id: string): void {
    this.isLoadingWorkouts.set(true);

    this.http
      .get<MuscleGroupResponse>(`${this.api}/musclesGroup/${id}`, {
        headers: { 'accept-language': 'ar' },
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          const mapped: MuscleGroupWorkout[] = (res.muscles ?? []).map((item) => ({
            _id: item._id,
            title: item.name,
            image: item.image,
          }));
          this.workouts.set(mapped);
          this.activeSlideIndex.set(0);
          this.isLoadingWorkouts.set(false);
        },
        error: () => {
          this.isLoadingWorkouts.set(false);
        },
      });
  }

  selectMuscle(muscle: Muscle): void {
    this.selectedMuscle.set(muscle);
    this.loadWorkouts(muscle._id);
  }

  onSlideChange(event: CustomEvent): void {
    const swiperEl = event.target as HTMLElement & {
      swiper: { activeIndex: number };
    };
    this.activeSlideIndex.set(swiperEl.swiper.activeIndex);
  }

  onExplore(workout: MuscleGroupWorkout): void {
    console.log('explore workout:', workout.title);
  }
}
