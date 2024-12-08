import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Directive({
  selector: '[appNoIndex]',
})
export class NoIndexDirective implements OnInit, OnDestroy {
  private _meta = inject(Meta);

  ngOnInit(): void {
    this._meta.addTag({ name: 'robots', content: 'noindex' });
  }

  ngOnDestroy(): void {
    this._meta.removeTag('name=robots');
  }
}
