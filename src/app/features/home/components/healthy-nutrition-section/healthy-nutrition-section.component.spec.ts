import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthyNutritionSectionComponent } from './healthy-nutrition-section.component';

describe('HealthyNutritionSectionComponent', () => {
  let component: HealthyNutritionSectionComponent;
  let fixture: ComponentFixture<HealthyNutritionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthyNutritionSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthyNutritionSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
