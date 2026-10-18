import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeGoalAndLevelComponent } from './change-goal-and-level.component';

describe('ChangeGoalAndLevelComponent', () => {
  let component: ChangeGoalAndLevelComponent;
  let fixture: ComponentFixture<ChangeGoalAndLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeGoalAndLevelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeGoalAndLevelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
