import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-auth-switcher',
  template: `<div class="text-white text-center">
    {{ text() }}
    <a [routerLink]="linkRef()" class="underline text-primary font-extrabold">{{ linkLabel() }}</a>
  </div>`,
})
export class AuthSwitcherComponent {
  text = input<string>('');
  linkLabel = input<string>('');
  linkRef = input<string>('');
}
