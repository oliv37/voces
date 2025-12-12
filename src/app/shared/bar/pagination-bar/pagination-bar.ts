import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.html',
})
export class PaginationBar {
  readonly lastPage = input.required<number>();
  readonly currentPage = input.required<number>();
  readonly highlightedPages = input<number[]>([]);

  readonly selectPage = output<number>();

  protected readonly previousPage = computed<number>(() =>
    Math.max(1, this.currentPage() - 1)
  );

  protected readonly nextPage = computed<number>(() =>
    Math.min(this.lastPage(), this.currentPage() + 1)
  );

  protected readonly isFirstPageHighlighted = computed<boolean>(() =>
    this.highlightedPages().includes(1)
  );

  protected readonly isPreviousPageHighlighted = computed<boolean>(() =>
    this.highlightedPages().includes(this.previousPage())
  );

  protected readonly isNextPageHighlighted = computed<boolean>(() =>
    this.highlightedPages().includes(this.nextPage())
  );

  protected readonly isLastPageHighlighted = computed<boolean>(() =>
    this.highlightedPages().includes(this.lastPage())
  );
}
