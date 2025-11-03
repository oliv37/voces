import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  effect,
} from '@angular/core';
import type { OpenGraph } from '@shared/models/open-graph';
import type { WordGroup } from './models/word';
import { Meta } from '@shared/directives/meta';
import { ScrollInfo } from '@shared/services/scroll-info';
import { WordExerciceLink } from './components/word-exercice-link/word-exercice-link';

const NB_WORD_GROUPS_TO_LOAD = 15;

let nbWordGroupsLoaded = 0;

@Component({
  imports: [Meta, WordExerciceLink],
  templateUrl: './word-page.html',
  providers: [ScrollInfo],
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class WordPage {
  private scrollInfo = inject(ScrollInfo);

  wordGroups = input.required<WordGroup[]>();

  private wordGroupsReversed = computed(() =>
    this.wordGroups().slice().reverse()
  );

  nbWords = computed(() => this.wordGroups().flatMap((g) => g.words).length);

  wordGroupsToShow = linkedSignal<WordGroup[]>(() =>
    this.wordGroupsReversed().slice(
      0,
      Math.max(nbWordGroupsLoaded, NB_WORD_GROUPS_TO_LOAD)
    )
  );

  metaDescription = computed<string>(
    () => `Visualisez les ${this.nbWords()} mots de Vocabulaire en Espagnol.`
  );

  metaOg = computed<OpenGraph>(() => ({
    title: 'Voces - Vocabulaire Espagnol',
    description: `Voces | ${this.nbWords()} mots de Vocabulaire Espagnol`,
  }));

  constructor() {
    effect(() => {
      nbWordGroupsLoaded = this.wordGroupsToShow().length;
    });
  }

  onScroll() {
    const wordGroupsToShow = this.wordGroupsToShow();
    const { isScrollingDown, isNearBottom } = this.scrollInfo.compute();
    const hasNext = wordGroupsToShow.length < this.wordGroupsReversed().length;

    const shouldLoadMoreNextGroups = hasNext && isScrollingDown && isNearBottom;

    if (shouldLoadMoreNextGroups) {
      const nextWordGroups = this.wordGroupsReversed().slice(
        0,
        wordGroupsToShow.length + NB_WORD_GROUPS_TO_LOAD
      );
      this.wordGroupsToShow.set(nextWordGroups);
    }
  }
}
