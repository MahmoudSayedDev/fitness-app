import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-auth-title',
  styleUrl: './auth-title.component.scss',
  template: `
    <div class="text-white py-2 px-4 leading-[140%] text-center">
      <p class="text-lg">{{'auth.Hey There' | translate}}</p>
      <p class="text-5xl font-extrabold">{{ title() | translate}}</p>
    </div>
  `,
})
export class AuthTitleComponent {
  title = input<string>('Title');
}
