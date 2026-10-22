import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { LucideDumbbell } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { ClassesFacadeService } from './services/classes-facade.service';
import { Muscle } from './models/classes.model';
import type { SwiperContainer } from 'swiper/element';
import type { SwiperOptions } from 'swiper/types';
import { SwiperDirective } from '../../shared/directives/swiper.directive';
import { MuscleCardComponent } from './components/class-card/muscle-card.component';
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, LucideDumbbell, SwiperDirective, MuscleCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-classes',
  styleUrl: './classes.component.scss',
  templateUrl: './classes.component.html',
})
export class ClassesComponent implements OnInit {
  protected readonly classesFacade = inject(ClassesFacadeService);
  private readonly router = inject(Router)

  protected readonly pageCount = signal(0);
  protected readonly activePage = signal(0);
  protected readonly dots = computed(() => Array.from({ length: this.pageCount() }, (_, i) => i));

  protected readonly muscleConfig: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 12,
    freeMode: true,
    breakpoints: {
      320: { slidesPerView: 2 },
      480: { slidesPerView: 3 },
      640: { slidesPerView: 4 },
      768: { slidesPerView: 5 },
      1024: { slidesPerView: 7 },
    },
  };

  // Rebuilt whenever the workouts change; a fresh element picks it up on creation
  protected readonly workoutsConfig = computed<SwiperOptions>(() => {
    const count = this.classesFacade.workouts().length;
    // if everything fits in one row of N columns, don't ask for 2 rows
    const rows = (cols: number) => (count <= cols ? 1 : 2);

    return {
      slidesPerView: 1,
      spaceBetween: 16,
      grid: { rows: 1, fill: 'row' },
      observer: true,
      observeParents: true,
      breakpoints: {
        0: { slidesPerView: 1, slidesPerGroup: 1, grid: { rows: 1, fill: 'row' } },
        480: { slidesPerView: 2, slidesPerGroup: 2, grid: { rows: 1, fill: 'row' } },
        768: { slidesPerView: 2, slidesPerGroup: 2, grid: { rows: rows(2), fill: 'row' } },
        1024: { slidesPerView: 3, slidesPerGroup: 3, grid: { rows: rows(3), fill: 'row' } },
      },
    };
  });

  protected selectMuscle(muscle: Muscle): void {
    this.classesFacade.selectMuscle(muscle);
  }

  protected onExplore(workoutId: string): void {
    this.router.navigate(['/exercises/', workoutId])
  }

  protected syncSwiperState(event: Event): void {
    const el = event.target as SwiperContainer;

    requestAnimationFrame(() => {
      const swiper = el.swiper;
      if (!swiper) return;
      el.style.setProperty('--rows', String(swiper.params.grid?.rows ?? 1));
      this.pageCount.set(swiper.snapGrid.length);
      this.activePage.set(swiper.snapIndex);
    });
  }

  ngOnInit(): void {
    this.classesFacade.loadMuscles();
  }
}
