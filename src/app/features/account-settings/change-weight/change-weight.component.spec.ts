import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeWeightComponent } from './change-weight.component';

describe('ChangeWeightComponent', () => {
  let component: ChangeWeightComponent;
  let fixture: ComponentFixture<ChangeWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeWeightComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeWeightComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
