import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-why-us-section',
  styleUrl: './why-us-section.component.scss',
  templateUrl: './why-us-section.component.html',
})
export class WhyUsSectionComponent {}
