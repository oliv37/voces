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

    const size = 5;
    const startPage = Math.max(
      1,
      Math.min(currentPage - Math.floor(size / 2), totalPage - (size - 1))
    );
    const endPage = Math.min(totalPage, startPage + (size - 1));

    return [
      startPage > 1 ? [1] : [],
      [...Array(endPage + 1 - startPage).keys()].map((i) => startPage + i),
      endPage < totalPage ? [totalPage] : [],
    ].flat();
  });
}
