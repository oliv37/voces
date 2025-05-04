import { Component, computed, input } from '@angular/core';
import { Category } from '@models/category.model';
import { MetaDirective } from '@directives/meta.directive';
import { fadeIn } from '@animations/fade-in.animation';
import { ExerciceLinkComponent } from '../../components/exercice/exercice-link/exercice-link.component';
import { OpenGraph } from '@models/open-graph.model';

@Component({
  imports: [MetaDirective, ExerciceLinkComponent],
  templateUrl: './category-page.component.html',
  animations: [fadeIn('app-exercice-link', '100ms', '700ms')],
})
export class CategoryPageComponent {
  category = input.required<Category>();

  metaDescription = computed<string>(
    () =>
      `Visualisez les ${
        this.category().nbWords
      } mots de Vocabulaire Espagnol de la catégorie ${this.category().label}`
  );

  metaOg = computed<OpenGraph>(() => ({
    title: `Vocabulaire Espagnol ${this.category().label}`,
    description: `Liste des ${
      this.category().nbWords
    } mots de Vocabulaire Espagnol de la catégorie ${this.category().label}`,
  }));
}
