import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { LucideMars, LucideVenus } from '@lucide/angular';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { Gender, RegisterGenderData } from '../../models/register.models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, LucideMars, LucideVenus],
  selector: 'app-register-gender',
  styleUrl: './register-gender.component.scss',
  templateUrl: './register-gender.component.html',
})
export class RegisterGenderComponent {
  readonly next = output<RegisterGenderData>();

  selected = signal<Gender | null>(null);
  isValid = computed(() => this.selected() !== null);

  onNext(): void {
    if (!this.selected()) return;
    this.next.emit({ gender: this.selected()! });
  }
}
