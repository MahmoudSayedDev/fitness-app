import { TestBed } from '@angular/core/testing';
import { HealthyService } from './healthy.service';

describe('HealthyService', () => {
  let service: HealthyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
