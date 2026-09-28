import { Component, computed, input } from '@angular/core';
import { LucideLoaderCircle } from '@lucide/angular';

@Component({
  selector: 'app-button',
  imports: [LucideLoaderCircle],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    class: 'block',
  },
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  isLoading = input<boolean>(false);
  isDisabled = input<boolean>(false);
  styleClass = input<string>('');

  protected readonly isInactive = computed(() => this.isLoading() || this.isDisabled());
}
