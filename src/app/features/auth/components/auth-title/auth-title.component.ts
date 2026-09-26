import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-auth-title',
  styleUrl: './auth-title.component.scss',
  template: `
    <div class="text-white py-2 px-4 leading-[140%] text-center">
      <p class="text-lg">Hey There</p>
      <p class="text-5xl font-extrabold">{{ title() }}</p>
    </div>
  `,
})
export class AuthTitleComponent {
  title = input<string>('Title');
}
