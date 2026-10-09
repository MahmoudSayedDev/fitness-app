import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [
    TranslatePipe
  ],
  selector: 'app-marquee-banner',
  styleUrl: './marquee-banner.component.scss',
  templateUrl: './marquee-banner.component.html',
})
export class MarqueeBannerComponent {}
