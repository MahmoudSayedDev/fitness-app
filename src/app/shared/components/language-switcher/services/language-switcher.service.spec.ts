import { TestBed } from '@angular/core/testing';

import { LanguageSwitcherService } from './language-switcher.service';

describe('LanguageSwitcherService', () => {
  let service: LanguageSwitcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageSwitcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
