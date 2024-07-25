import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeWordCardComponent } from './home-card/home-card.component';
import type { HomeLang } from './home.model';

@Component({
  standalone: true,
  imports: [RouterLink, HomeWordCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  homeLangs = input.required<HomeLang[]>();
}
