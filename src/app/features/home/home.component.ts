import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { AboutUsSectionComponent } from './components/about-us-section/about-us-section.component';
import { WorkoutsSectionComponent } from './components/workouts-section/workouts-section.component';
import { WhyUsSectionComponent } from './components/why-us-section/why-us-section.component';
import { HealthyNutritionSectionComponent } from './components/healthy-nutrition-section/healthy-nutrition-section.component';
import { FooterComponent } from '../../shared/layout/footer/footer.component';
import { ThemeSwitcherComponent } from '../../shared/components/theme-switcher/theme-switcher.component';
import { MarqueeBannerComponent } from '../../shared/components/marquee-banner/marquee-banner.component';

@Component({
  imports: [
    HeroSectionComponent,
    AboutUsSectionComponent,
    WorkoutsSectionComponent,
    WhyUsSectionComponent,
    HealthyNutritionSectionComponent,
    FooterComponent,
    ThemeSwitcherComponent
    MarqueeBannerComponent
  ],
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
