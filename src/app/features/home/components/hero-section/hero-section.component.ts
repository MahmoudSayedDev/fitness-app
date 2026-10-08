import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  imports: [
    ButtonComponent
  ],
  selector: 'app-hero-section',
  styleUrl: './hero-section.component.scss',
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {}
