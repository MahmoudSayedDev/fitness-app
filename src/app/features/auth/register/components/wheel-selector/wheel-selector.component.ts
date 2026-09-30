import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  OnInit,
  output,
  PLATFORM_ID,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';

@Component({
  encapsulation: ViewEncapsulation.None,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-wheel-selector',
  styleUrl: './wheel-selector.component.scss',
  templateUrl: './wheel-selector.component.html',
})
export class WheelSelectorComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  min = input.required<number>();
  max = input.required<number>();
  unit = input<string>('');
  initialValue = input<number | null>(null);
  valueChange = output<number>();

  options = computed(() =>
    Array.from({ length: this.max() - this.min() + 1 }, (_, i) => this.min() + i),
  );

  initialIndex = computed(() => {
    const initVal = this.initialValue() ?? Math.floor((this.min() + this.max()) / 2);
    const index = this.options().indexOf(initVal);
    return index >= 0 ? index : 0;
  });

  selectedValue = signal<number | null>(null);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    register();

    const initVal = this.initialValue() ?? Math.floor((this.min() + this.max()) / 2);
    this.selectedValue.set(initVal);
  }

  onSlideChange(event: CustomEvent): void {
    const swiperEl = event.target as HTMLElement & {
      swiper: Swiper;
    };
    
    const value = this.options()[swiperEl.swiper.activeIndex];

    if (value === undefined) return;

    this.selectedValue.set(value);
    this.valueChange.emit(value);
  }
}