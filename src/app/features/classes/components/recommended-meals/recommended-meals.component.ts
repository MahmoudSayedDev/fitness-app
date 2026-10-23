import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { HealthyService } from '../../../healthy/services/healthy.service';
import { Meal } from '../../../healthy/models/meals.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { SwiperOptions } from 'swiper/types';
import { SwiperDirective } from '../../../../shared/directives/swiper.directive';
import { CardItemComponent } from '../../../../shared/components/card-item/card-item.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [SwiperDirective, CardItemComponent, TranslatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-recommended-meals',
  styleUrl: './recommended-meals.component.scss',
  templateUrl: './recommended-meals.component.html',
})
export class RecommendedMealsComponent implements OnInit {
  private readonly healthyService = inject(HealthyService);
  private readonly destroyRef = inject(DestroyRef);

  meals = signal<Meal[]>([]);

  getMealsByCategory(): void {
    this.healthyService
      .getMealsByCategory('Breakfast')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.meals.set(res.meals ?? []);
        },
      });
  }

  protected readonly workoutsConfig = computed<SwiperOptions>(() => {
    return {
      slidesPerView: 1,
      spaceBetween: 16,
      grid: { rows: 1, fill: 'row' },
      observer: true,
      observeParents: true,
      breakpoints: {
        0: { slidesPerView: 1, slidesPerGroup: 1, grid: { rows: 1, fill: 'row' } },
        480: { slidesPerView: 2, slidesPerGroup: 2, grid: { rows: 1, fill: 'row' } },
        768: { slidesPerView: 2, slidesPerGroup: 2, grid: { rows: 1, fill: 'row' } },
        1024: { slidesPerView: 3, slidesPerGroup: 3, grid: { rows: 1, fill: 'row' } },
      },
    };
  });

  ngOnInit(): void {
    this.getMealsByCategory();
  }
}
