import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { HomeLang } from '../home.model';
import { getLangLabel } from '@shared/lang/lang.util';

@Component({
  selector: 'app-word-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-card.component.html',
})
export class HomeWordCardComponent {
  homeLang = input.required<HomeLang>();
  getLangLabel = getLangLabel;
}
