import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { MealsCategories } from '../models/meals-categories.interface';

@Service()
export class HealthyService {

    private readonly _httpClient = inject(HttpClient);


    getMealsCategories(): Observable<MealsCategories> {
        return this._httpClient.get<MealsCategories>('https://www.themealdb.com/api/json/v1/1/categories.php')
    }
}
