import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-toggle-chatbot',
  styleUrl: './toggle-chatbot.component.scss',
  templateUrl: './toggle-chatbot.component.html',
})
export class ToggleChatbotComponent {
  onClick = output();
  label = input<string>('Hey Ask Me');

  handleClick = (): void => this.onClick.emit();
}
