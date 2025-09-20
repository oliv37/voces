import { Injectable } from '@angular/core';
import type { ScrollInfo as ScrollInfoModel } from '../models/scroll-info';

@Injectable()
export class ScrollInfo {
  private _currentScrollTop = 0;
  private _previousScrollTop = 0;

  compute(): ScrollInfoModel {
    this._previousScrollTop = this._currentScrollTop;
    this._currentScrollTop = document.documentElement.scrollTop;

    return {
      scrollTop: this._currentScrollTop,
      isScrollingDown: this.isScrollDown(),
      isNearBottom: this.isNearBottom(),
    };
  }

  private isScrollDown(): boolean {
    return this._currentScrollTop > this._previousScrollTop;
  }

  private isNearBottom(): boolean {
    const windowHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;

    return this._currentScrollTop + windowHeight >= totalHeight - windowHeight;
  }
}
