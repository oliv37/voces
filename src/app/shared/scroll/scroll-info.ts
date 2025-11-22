import { Injectable } from '@angular/core';
import type { ScrollInfo as ScrollInfoModel } from './scroll-info.model';

@Injectable()
export class ScrollInfo {
  #currentScrollTop = 0;
  #previousScrollTop = 0;

  compute(): ScrollInfoModel {
    this.#previousScrollTop = this.#currentScrollTop;
    this.#currentScrollTop = document.documentElement.scrollTop;

    return {
      scrollTop: this.#currentScrollTop,
      isScrollingDown: this.#isScrollDown(),
      isNearBottom: this.#isNearBottom(),
    };
  }

  #isScrollDown(): boolean {
    return this.#currentScrollTop > this.#previousScrollTop;
  }

  #isNearBottom(): boolean {
    const windowHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;

    return this.#currentScrollTop + windowHeight >= totalHeight - windowHeight;
  }
}
