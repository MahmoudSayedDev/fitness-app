import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSelectorComponent } from './test-selector.component';

describe('TestSelectorComponent', () => {
  let component: TestSelectorComponent;
  let fixture: ComponentFixture<TestSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestSelectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
