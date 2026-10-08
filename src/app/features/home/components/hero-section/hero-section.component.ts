import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [
    ButtonComponent,
    TranslatePipe
  ],
  selector: 'app-hero-section',
  styleUrl: './hero-section.component.scss',
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {}
