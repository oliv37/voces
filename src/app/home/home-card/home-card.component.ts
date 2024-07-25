import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { HomeLang } from '../home.model';

@Component({
  selector: 'app-word-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-card.component.html',
  host: { class: 'w-5/12' },
})
export class HomeWordCardComponent {
  homeLang = input.required<HomeLang>();
}
