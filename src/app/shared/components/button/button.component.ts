import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { LucideLoaderCircle } from '@lucide/angular';

interface ArrowProps {
  width?: string,
  height?: string,
  fill?: string,
}

@Component({
  selector: 'app-button',
  imports: [
    LucideLoaderCircle,
    NgClass
  ],
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
  outline = input<boolean>(false);
  withArrow = input<boolean>(false);
  arrowProps = input<ArrowProps>({
    width: '15',
    height: '15',
    fill: '#F3F3F4',
  });
  arrowStyleClass = input<string>('');
  styleClass = input<string>('');
  onClick = output<void>();

  protected readonly isInactive = computed(() => this.isLoading() || this.isDisabled());

  handleClick() {
    if (!this.isDisabled() && !this.isLoading()) {
      this.onClick.emit();
    }
  }
}
