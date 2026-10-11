import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  selector: 'app-why-us-section',
  styleUrl: './why-us-section.component.scss',
  templateUrl: './why-us-section.component.html',
})
export class WhyUsSectionComponent {}
