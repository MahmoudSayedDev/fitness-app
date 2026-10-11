import { Component, inject, OnInit, signal } from '@angular/core';
import { LucideDumbbell } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { HealthyService } from '../../../healthy/services/healthy.service';
import { MealsCategory } from '../../../healthy/models/meals-categories.interface';

@Component({
  imports: [
    ButtonComponent,
    TranslatePipe,
    LucideDumbbell
  ],
  selector: 'app-healthy-nutrition-section',
  styleUrl: './healthy-nutrition-section.component.scss',
  templateUrl: './healthy-nutrition-section.component.html',
})
export class HealthyNutritionSectionComponent implements OnInit {

  private _healthyService = inject(HealthyService)

  mealsCategories = signal<MealsCategory[]>([])

  ngOnInit(): void {
    this.getMealsCategories()
  }

  getMealsCategories() {
    this._healthyService.getMealsCategories().subscribe({
      next: (res) => {
        this.mealsCategories.set(res.categories)
        console.log(this.mealsCategories());
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
