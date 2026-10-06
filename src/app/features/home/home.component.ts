import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { AboutUsSectionComponent } from './components/about-us-section/about-us-section.component';
import { WorkoutsSectionComponent } from './components/workouts-section/workouts-section.component';
import { WhyUsSectionComponent } from './components/why-us-section/why-us-section.component';
import { HealthyNutritionSectionComponent } from './components/healthy-nutrition-section/healthy-nutrition-section.component';

@Component({
  imports: [
    ButtonComponent,
    HeroSectionComponent,
    AboutUsSectionComponent,
    WorkoutsSectionComponent,
    WhyUsSectionComponent,
    HealthyNutritionSectionComponent,
  ],
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
