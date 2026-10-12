import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MY_TOKEN } from '../../../../core/tokens/app-config.token';
import { WorkoutsSectionComponent } from './workouts-section.component';

describe('WorkoutsSectionComponent', () => {
  let component: WorkoutsSectionComponent;
  let fixture: ComponentFixture<WorkoutsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutsSectionComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MY_TOKEN, useValue: 'https://fitness.elevateegy.com/api/v1' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutsSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
