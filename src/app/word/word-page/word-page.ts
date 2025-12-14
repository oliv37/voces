import { Component, computed, input } from '@angular/core';
import type { OpenGraph } from '@shared/seo/open-graph.model';
import { Meta } from '@shared/seo/meta';
import type { WordGroup } from '../word.model';
import { WordExerciceLink } from '../word-exercice/word-exercice-link/word-exercice-link';

@Component({
  imports: [Meta, WordExerciceLink],
  templateUrl: './word-page.html',
})
export class WordPage {
  readonly wordGroups = input.required<WordGroup[]>();

  protected readonly wordGroupsReversed = computed(() =>
    this.wordGroups().slice().reverse()
  );

  protected readonly nbWords = computed(
    () => this.wordGroups().flatMap((g) => g.words).length
  );

  protected readonly metaDescription = computed<string>(
    () => `Visualisez les ${this.nbWords()} mots de Vocabulaire en Espagnol.`
  );

  protected readonly metaOg = computed<OpenGraph>(() => ({
    title: 'Voces - Vocabulaire Espagnol',
    description: `Voces | ${this.nbWords()} mots de Vocabulaire Espagnol`,
  }));
}
