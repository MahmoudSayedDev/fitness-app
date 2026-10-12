import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideDumbbell } from '@lucide/angular';

@Component({
  imports: [
    ButtonComponent,
    TranslatePipe,
    LucideDumbbell
  ],
  selector: 'app-about-us-section',
  styleUrl: './about-us-section.component.scss',
  templateUrl: './about-us-section.component.html',
})
export class AboutUsSectionComponent {}
