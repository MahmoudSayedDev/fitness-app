import { afterNextRender, Directive, ElementRef, inject, input } from '@angular/core';
import type { SwiperContainer } from 'swiper/element';
import type { SwiperOptions } from 'swiper/types';
import { register } from 'swiper/element/bundle';

@Directive({
  selector: 'swiper-container[appSwiper]',
})
export class SwiperDirective {
  readonly config = input.required<SwiperOptions>({ alias: 'appSwiper' });
  private readonly el = inject<ElementRef<SwiperContainer>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      register();
      Object.assign(this.el.nativeElement, this.config());
      this.el.nativeElement.initialize();
    });
  }
}
