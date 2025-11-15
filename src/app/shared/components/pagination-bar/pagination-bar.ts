import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.html',
  imports: [NgClass],
})
export class PaginationBar {
  totalPage = input.required<number>();
  currentPage = input.required<number>();
  highlightedPages = input<number[]>([]);

  selectPage = output<number>();

  pages = computed<number[]>(() => {
    const totalPage = this.totalPage();
    const currentPage = this.currentPage();

    const rangeSize = 5;
    const rangePage = computeRangePage(currentPage, totalPage, rangeSize);
    const startPage = rangePage.startPage;
    const endPage = rangePage.endPage;
    const pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    return [
      ...(startPage > 1 ? [1] : []),
      ...pages,
      ...(endPage < totalPage ? [totalPage] : []),
    ];
  });
}

function computeRangePage(
  currentPage: number,
  totalPage: number,
  rangeSize: number
): { startPage: number; endPage: number } {
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(rangeSize / 2),
      totalPage - (rangeSize - 1)
    )
  );
  const endPage = Math.min(totalPage, startPage + (rangeSize - 1));

  return { startPage, endPage };
}
