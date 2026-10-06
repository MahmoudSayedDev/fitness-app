import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutsSectionComponent } from './workouts-section.component';

describe('WorkoutsSectionComponent', () => {
  let component: WorkoutsSectionComponent;
  let fixture: ComponentFixture<WorkoutsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutsSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutsSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
