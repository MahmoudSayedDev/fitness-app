import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthTitleComponent } from './auth-title.component';

describe('AuthTitleComponent', () => {
  let component: AuthTitleComponent;
  let fixture: ComponentFixture<AuthTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthTitleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
