import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '@models/category.model';
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { DATA } from '@utils/data.util';
import { MetaDirective } from '@directives/meta.directive';

@Component({
  imports: [RouterLink, SpacerComponent, MetaDirective, MetaDirective],
  templateUrl: './home-page.component.html',
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
