import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '@models/category.model';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  categories = input.required<Category[]>();
  nbWords = computed<number>(() =>
    this.categories()
      .map((category) => category.nbWords)
      .reduce((acc, curr) => acc + curr, 0)
  );
}
