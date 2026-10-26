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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { map, switchMap, tap } from 'rxjs';
import { register } from 'swiper/element/bundle';
import { MealDetails, MealIngredient } from '../../models/meal-details.interface';
import { MealsCategory } from '../../models/meals-categories.interface';
import { Meal } from '../../models/meals.interface';
import { HealthyService } from '../../services/healthy.service';

@Component({
  imports: [
    RouterLink,
    TranslatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-healthy-details',
  styleUrl: './healthy-details.component.scss',
  templateUrl: './healthy-details.component.html',
})
export class HealthyDetailsComponent implements OnInit {

  private readonly _healthyService = inject(HealthyService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _platformId = inject(PLATFORM_ID);

  mealsCategories = signal<MealsCategory[]>([]);
  selectedCategory = signal<string | null>(null);
  meals = signal<Meal[]>([]);
  mealDetails = signal<MealDetails | null>(null);
  isLoadingDetails = signal<boolean>(false);

  ingredients = computed<MealIngredient[]>(() => {
    const meal = this.mealDetails();
    if (!meal) return [];

    const list: MealIngredient[] = [];
    for (let i = 1; i <= 20; i++) {
      const name = meal[`strIngredient${i}`]?.trim();
      if (name) {
        list.push({ name, measure: meal[`strMeasure${i}`]?.trim() ?? '' });
      }
    }
    return list;
  });

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      register();
    }
  }

  ngOnInit(): void {
    this.getMealsCategories();
    this.getMealDetailsOnRouteChange();
  }

  getMealsCategories() {
    this._healthyService.getMealsCategories()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.mealsCategories.set(res.categories ?? []);
        }, error: (err) => {
          console.log(err);
        }
      });
  }

  getMealDetailsOnRouteChange() {
    this._activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id') ?? ''),
        tap(() => this.isLoadingDetails.set(true)),
        switchMap((id) => this._healthyService.getMealDetails(id)),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe({
        next: (res) => {
          const meal = res.meals?.[0] ?? null;
          this.mealDetails.set(meal);
          this.isLoadingDetails.set(false);

          if (meal && meal.strCategory !== this.selectedCategory()) {
            this.selectCategory(meal.strCategory);
          }
        }, error: (err) => {
          console.log(err);
          this.isLoadingDetails.set(false);
        }
      });
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);

    this._healthyService.getMealsByCategory(category)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.meals.set(res.meals ?? []);
        }, error: (err) => {
          console.log(err);
        }
      });
  }
}
