import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Category } from '@models/category';
import type { OpenGraph } from '@models/open-graph';
import { DATA } from '@utils/data';
import { Meta } from '@directives/meta';
import { fadeIn } from '@animations/fade-in';
import { GroupCompletion } from '@services/group-completion';

@Component({
  imports: [RouterLink, Meta],
  templateUrl: './home-page.html',
  animations: [fadeIn('a', '100ms', '0.4s')],
})
export class HomePage {
  private _groupCompletion = inject(GroupCompletion);

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
      this._groupCompletion.isCompleted(group)
    ).length;
    const nbGroups = category.groups.length;
    return (nbGroupsCompleted / nbGroups) * 100;
  }
}
