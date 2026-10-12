import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthyComponent } from './healthy.component';

describe('HealthyComponent', () => {
  let component: HealthyComponent;
  let fixture: ComponentFixture<HealthyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
