import { Component, computed, input, output } from '@angular/core';
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
  onClick = output<void>();

  protected readonly isInactive = computed(() => this.isLoading() || this.isDisabled());

  handleClick() {
    if (!this.isDisabled() && !this.isLoading()) {
      this.onClick.emit();
    }
  }
}
