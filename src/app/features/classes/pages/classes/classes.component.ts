import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { LucideDumbbell } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import type { SwiperContainer } from 'swiper/element';
import type { SwiperOptions } from 'swiper/types';
import { Router } from '@angular/router';
import { CardItemComponent } from '../../../../shared/components/card-item/card-item.component';
import { MarqueeBannerComponent } from '../../../../shared/components/marquee-banner/marquee-banner.component';
import { SwiperDirective } from '../../../../shared/directives/swiper.directive';
import { FooterComponent } from '../../../../shared/layout/footer/footer.component';
import { Muscle } from '../../models/classes.model';
import { ClassesFacadeService } from '../../services/classes-facade.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
    LucideDumbbell,
    SwiperDirective,
    CardItemComponent,
    MarqueeBannerComponent,
    FooterComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-classes',
  styleUrl: './classes.component.scss',
  templateUrl: './classes.component.html',
})
export class ClassesComponent {
  protected readonly classesFacade = inject(ClassesFacadeService);
  private readonly router = inject(Router);

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

  protected readonly workoutsConfig = computed<SwiperOptions>(() => {
    const count = this.classesFacade.workouts().length;
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
    this.classesFacade.selectMuscle(muscle._id);
  }

  protected onExplore(workoutId: string): void {
    this.router.navigate(['/classes/', workoutId]);
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
}
