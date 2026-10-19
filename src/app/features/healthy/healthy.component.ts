import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { LucideDumbbell } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { register } from 'swiper/element/bundle';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MarqueeBannerComponent } from '../../shared/components/marquee-banner/marquee-banner.component';
import { MealsCategory } from './models/meals-categories.interface';
import { Meal } from './models/meals.interface';
import { HealthyService } from './services/healthy.service';

const MEALS_PER_PAGE = 6;

@Component({
  imports: [
    ButtonComponent,
    TranslatePipe,
    LucideDumbbell,
    MarqueeBannerComponent,
    RouterLink
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-healthy',
  styleUrl: './healthy.component.scss',
  templateUrl: './healthy.component.html',
})
export class HealthyComponent implements OnInit {

  private readonly _healthyService = inject(HealthyService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _platformId = inject(PLATFORM_ID);

  mealsCategories = signal<MealsCategory[]>([]);
  selectedCategory = signal<MealsCategory | null>(null);
  meals = signal<Meal[]>([]);
  isLoadingMeals = signal<boolean>(false);
  currentPage = signal<number>(0);

  pages = computed(() => Array.from({ length: Math.ceil(this.meals().length / MEALS_PER_PAGE) }, (_, i) => i));
  pagedMeals = computed(() => {
    const start = this.currentPage() * MEALS_PER_PAGE;
    return this.meals().slice(start, start + MEALS_PER_PAGE);
  });

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      register();
    }
  }

  ngOnInit(): void {
    this.getMealsCategories();
  }

  getMealsCategories() {
    this._healthyService.getMealsCategories()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          const list = res.categories ?? [];
          this.mealsCategories.set(list);

          if (list.length > 0) {
            this.selectCategory(list[0]);
          }
        }, error: (err) => {
          console.log(err);
        }
      });
  }

  selectCategory(category: MealsCategory) {
    this.selectedCategory.set(category);
    this.getMealsByCategory(category.strCategory);
  }

  getMealsByCategory(category: string) {
    this.isLoadingMeals.set(true);

    this._healthyService.getMealsByCategory(category)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.meals.set(res.meals ?? []);
          this.currentPage.set(0);
          this.isLoadingMeals.set(false);
        }, error: (err) => {
          console.log(err);
          this.isLoadingMeals.set(false);
        }
      });
  }

  goToPage(page: number) {
    this.currentPage.set(page);
  }
}
