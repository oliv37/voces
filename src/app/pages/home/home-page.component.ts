import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '@models/category.model';
import { DATA } from '@utils/data.util';
import { MetaDirective } from '@directives/meta.directive';
import { fadeIn } from '@animations/fade-in.animation';
import { GroupCompletionService } from '@services/group-completion.service';
import { OpenGraph } from '@models/open-graph.model';

@Component({
  imports: [RouterLink, MetaDirective],
  templateUrl: './home-page.component.html',
  animations: [fadeIn('a', '100ms', '0.4s')],
})
export class HomePageComponent {
  private _groupCompletionService = inject(GroupCompletionService);

  data: (Category & { progressPercent: number })[][] = DATA.map((categories) =>
    categories.map((category) => ({
      ...category,
      progressPercent: this.computeProgressPercent(category),
    }))
  );

  nbWords: number = DATA.flat()
    .map((category) => category.nbWords)
    .reduce((res, nbWords) => res + nbWords, 0);

  metaDescription =
    'Visualisez les ' +
    this.nbWords +
    ' mots de Vocabulaire en Espagnol regroupés par niveaux.';

  metaOg: OpenGraph = {
    title: 'Voces - Vocabulaire Espagnol',
    description:
      'Voces | ' +
      this.nbWords +
      ' mots de Vocabulaire Espagnol regroupés par niveaux',
  };

  private computeProgressPercent(category: Category): number {
    const nbGroupsCompleted = category.groups.filter((group) =>
      this._groupCompletionService.isCompleted(group)
    ).length;
    const nbGroups = category.groups.length;
    return (nbGroupsCompleted / nbGroups) * 100;
  }
}
