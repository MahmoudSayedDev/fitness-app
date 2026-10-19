import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { MealsCategories } from '../models/meals-categories.interface';
import { Meals } from '../models/meals.interface';
import { MealDetailsResponse } from '../models/meal-details.interface';

@Service()
export class HealthyService {

    private readonly _httpClient = inject(HttpClient);


    getMealsCategories(): Observable<MealsCategories> {
        return this._httpClient.get<MealsCategories>('https://www.themealdb.com/api/json/v1/1/categories.php')
    }

    getMealsByCategory(category: string): Observable<Meals> {
        return this._httpClient.get<Meals>('https://www.themealdb.com/api/json/v1/1/filter.php', { params: { c: category } })
    }

    getMealDetails(id: string): Observable<MealDetailsResponse> {
        return this._httpClient.get<MealDetailsResponse>('https://www.themealdb.com/api/json/v1/1/lookup.php', { params: { i: id } })
    }
}
