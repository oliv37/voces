import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '@models/category.model';
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { CATEGORIES } from '@utils/category.util';

@Component({
  standalone: true,
  imports: [RouterLink, SpacerComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  categories = signal<Category[][]>(CATEGORIES).asReadonly();

  nbWords = computed<number>(() =>
    this.categories()
      .flat()
      .map((category) => category.nbWords)
      .reduce((res, nbWords) => res + nbWords, 0)
  );
}
