import {
  Component,
  computed,
  effect,
  input,
  linkedSignal,
} from '@angular/core';
import type { OpenGraph } from '@shared/seo/open-graph.model';
import { Meta } from '@shared/seo/meta';
import type { WordGroup } from '../word.model';
import { WordExerciceLink } from '../word-exercice/word-exercice-link/word-exercice-link';
import { PaginationBar } from '@shared/bar/pagination-bar/pagination-bar';

const NB_GROUPS_PER_PAGE = 30;
let CURRENT_PAGE_SAVED: number | undefined;

@Component({
  imports: [Meta, WordExerciceLink, PaginationBar],
  templateUrl: './word-page.html',
})
export class WordPage {
  readonly wordGroups = input.required<WordGroup[]>();

  protected readonly lastPage = computed(() =>
    Math.ceil(this.wordGroups().length / NB_GROUPS_PER_PAGE)
  );

  protected readonly currentPage = linkedSignal(() =>
    this.#readSavedCurrentPage()
  );

  protected readonly wordGroupsToShow = computed(() => {
    const currentPage = this.currentPage();
    const wordGroups = this.wordGroups();

    const startIdx = (currentPage - 1) * NB_GROUPS_PER_PAGE;
    const endIdx = Math.min(startIdx + NB_GROUPS_PER_PAGE, wordGroups.length);

    return wordGroups.slice(startIdx, endIdx).reverse();
  });

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

  readonly saveCurrentPageEffect = effect(() => {
    const currentPage = this.currentPage();
    CURRENT_PAGE_SAVED = currentPage;
  });

  setCurrentPage(page: number) {
    this.currentPage.set(page);
    this.#scrollToTop();
  }

  #readSavedCurrentPage(): number {
    const lastPage = this.lastPage();

    const currentPage = Number(CURRENT_PAGE_SAVED);
    const isValidCurrentPage =
      !Number.isNaN(currentPage) && currentPage >= 1 && currentPage <= lastPage;

    return isValidCurrentPage ? currentPage : lastPage;
  }

  #scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
