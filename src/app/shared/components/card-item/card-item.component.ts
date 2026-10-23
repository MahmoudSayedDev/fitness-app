import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-card-item',
  styleUrl: './card-item.component.scss',
  templateUrl: './card-item.component.html',
})
export class CardItemComponent {
  imageUrl = input.required<string>();
  title = input.required<string>();
  id = input.required<string>();

  height = input<string>('h-100');

  explore = output<string>();

  handleClick(): void {
    this.explore.emit(this.id());
  }
}
