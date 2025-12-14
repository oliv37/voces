import {
  booleanAttribute,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.html',
})
export class PaginationBar {
  readonly lastPage = input.required<number>();
  readonly currentPage = input.required<number>();
  readonly reversed = input<boolean, string>(false, {
    transform: booleanAttribute,
  });
  readonly highlightedPages = input<number[]>([]);

  readonly selectPage = output<number>();

  readonly upperLeftPage = computed<number>(() =>
    this.reversed() ? this.lastPage() : 1
  );

  readonly upperRightPage = computed<number>(() =>
    this.reversed() ? 1 : this.lastPage()
  );

  protected readonly leftPage = computed<number>(() =>
    this.reversed()
      ? Math.min(this.upperLeftPage(), this.currentPage() + 1)
      : Math.max(this.upperLeftPage(), this.currentPage() - 1)
  );

  protected readonly rightPage = computed<number>(() =>
    this.reversed()
      ? Math.max(this.upperRightPage(), this.currentPage() - 1)
      : Math.min(this.upperRightPage(), this.currentPage() + 1)
  );

  protected readonly isCurrentPageHighlighted = computed<boolean>(() =>
    this.highlightedPages().includes(this.currentPage())
  );

  protected readonly isUpperLeftPageHighlighted = computed<boolean>(() =>
    this.highlightedPages().includes(this.upperLeftPage())
  );

  protected readonly isUpperRightPageHighlighted = computed<boolean>(() =>
    this.highlightedPages().includes(this.upperRightPage())
  );

  protected readonly isLeftPageHighlighted = computed<boolean>(() =>
    this.highlightedPages().includes(this.leftPage())
  );

  protected readonly isRightPageHighlighted = computed<boolean>(() =>
    this.highlightedPages().includes(this.rightPage())
  );
}
