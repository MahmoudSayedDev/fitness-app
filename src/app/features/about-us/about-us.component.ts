import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideDumbbell } from '@lucide/angular';

@Component({
  imports: [
    ButtonComponent,
    TranslatePipe,
    LucideDumbbell
  ],
  selector: 'app-about-us',
  styleUrl: './about-us.component.scss',
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent { }
