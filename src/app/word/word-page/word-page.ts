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
import { ArrowRightIcon } from '@shared/icon/arrow-right-icon/arrow-right-icon';
import { ArrowLeftIcon } from '@shared/icon/arrow-left-icon/arrow-left-icon';

const NB_GROUPS_PER_PAGE = 20;
let LAST_CURRENT_PAGE: number | undefined;

@Component({
  imports: [
    Meta,
    WordExerciceLink,
    PaginationBar,
    ArrowRightIcon,
    ArrowLeftIcon,
  ],
  templateUrl: './word-page.html',
})
export class WordPage {
  readonly wordGroups = input.required<WordGroup[]>();

  protected readonly lastPage = computed(() =>
    Math.ceil(this.wordGroups().length / NB_GROUPS_PER_PAGE)
  );

  protected readonly currentPage = linkedSignal(() =>
    this.#findInitCurrentPage()
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
    LAST_CURRENT_PAGE = currentPage;
  });

  setCurrentPage(page: number) {
    this.currentPage.set(page);
    this.#scrollToTop();
  }

  goToPreviousPage() {
    const currentPage = this.currentPage();
    this.setCurrentPage(Math.max(1, currentPage - 1));
  }

  goToNextPage() {
    const currentPage = this.currentPage();
    const lastPage = this.lastPage();
    this.setCurrentPage(Math.min(lastPage, currentPage + 1));
  }

  #findInitCurrentPage(): number {
    const lastPage = this.lastPage();

    const currentPage = Number(LAST_CURRENT_PAGE);
    const isValidCurrentPage = currentPage >= 1 && currentPage <= lastPage;

    return isValidCurrentPage ? currentPage : lastPage;
  }

  #scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
