import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleChatbotComponent } from './toggle-chatbot.component';

describe('ToggleChatbotComponent', () => {
  let component: ToggleChatbotComponent;
  let fixture: ComponentFixture<ToggleChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleChatbotComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleChatbotComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
