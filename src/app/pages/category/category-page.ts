import { Component, computed, input } from '@angular/core';
import type { Category } from '@models/category';
import type { OpenGraph } from '@models/open-graph';
import { Meta } from '@directives/meta';
import { fadeIn } from '@animations/fade-in';
import { ExerciceLink } from '@components/exercice/exercice-link/exercice-link';

@Component({
  imports: [Meta, ExerciceLink],
  templateUrl: './category-page.html',
  animations: [fadeIn('app-exercice-link', '100ms', '700ms')],
})
export class CategoryPage {
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
