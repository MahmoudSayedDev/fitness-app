import { Component } from '@angular/core';
import { LucideMail, LucidePhone } from '@lucide/angular';

@Component({
  imports: [LucidePhone, LucideMail],
  selector: 'app-footer',
  styleUrl: './footer.component.scss',
  templateUrl: './footer.component.html',
})
export class FooterComponent {}
