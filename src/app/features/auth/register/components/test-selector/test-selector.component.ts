import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Swiper } from 'swiper/types';
import { register } from 'swiper/element/bundle';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [],
  selector: 'app-test-selector',
  styleUrl: './test-selector.component.scss',
  templateUrl: './test-selector.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TestSelectorComponent implements OnInit {

  private platformId = inject(PLATFORM_ID);

  ages = [18, 45]
  ageOptions = Array.from(
    { length: this.ages[1] - this.ages[0] + 1 },
    (_, i) => this.ages[0] + i
  );

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    register();
  }

  onSlideChange(event: CustomEvent) {

    const swiperEl = event.target as HTMLElement & {
      swiper: Swiper;
    };

    const swiper = swiperEl.swiper;
    const currentValue = this.ageOptions[swiper.activeIndex];

    console.log('current value:', currentValue);
  }
}
