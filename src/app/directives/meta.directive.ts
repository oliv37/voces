import { Directive, inject, input, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

/* eslint-disable @angular-eslint/directive-selector */

@Directive({
  selector: 'app-meta',
})
export class MetaDirective implements OnInit, OnDestroy {
  private _meta = inject(Meta);

  robots = input('index, follow');
  description = input('Vocabulaire Espagnol');

  ngOnInit(): void {
    this._meta.addTag({ name: 'robots', content: this.robots() });
    this._meta.addTag({ name: 'description', content: this.description() });
  }

  ngOnDestroy(): void {
    this._meta.removeTag('name=robots');
    this._meta.removeTag('name=description');
  }
}
