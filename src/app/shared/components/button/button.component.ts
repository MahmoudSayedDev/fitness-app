import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-button',
  styleUrl: './button.component.scss',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  text = input<string>('');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  onClick = output<void>();

  handleClick() {
    if (!this.disabled() && !this.loading()) {
      this.onClick.emit();
    }
  }
}
