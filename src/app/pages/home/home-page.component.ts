import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '@models/category.model';
import { DATA } from '@utils/data.util';
import { MetaDirective } from '@directives/meta.directive';
import { fadeIn } from '@animations/fade-in.animation';

@Component({
  imports: [RouterLink, MetaDirective],
  templateUrl: './home-page.component.html',
  animations: [fadeIn('a', '50ms', '0.4s')],
})
export class HomePageComponent {
  data = signal<Category[][]>(DATA).asReadonly();

  nbWords = computed<number>(() =>
    this.data()
      .flat()
      .map((category) => category.nbWords)
      .reduce((res, nbWords) => res + nbWords, 0)
  );
}
