import { TestBed } from '@angular/core/testing';
import { ClassesFacadeService } from './classes-facade.service';

describe('ClassesFacadeService', () => {
  let service: ClassesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
