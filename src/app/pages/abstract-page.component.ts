import { Directive, inject, input, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

const DEFAULT_META_ROBOTS = 'index, follow';
const DEFAULT_META_DESCRIPTION = 'Voces | Vocabulaire Espagnol';

@Directive()
export abstract class Page implements OnInit, OnDestroy {
  private _meta = inject(Meta);

  metaRobots = input<string>();
  metaDescription = input<string>();

  ngOnInit() {
    this.addMetaTags();
  }

  ngOnDestroy() {
    this.removeMetaTags();
  }

  private addMetaTags() {
    const metaRobots = this.metaRobots() || DEFAULT_META_ROBOTS;
    const metaDescription = this.metaDescription() || DEFAULT_META_DESCRIPTION;

    this._meta.addTag({ name: 'robots', content: metaRobots });
    this._meta.addTag({ name: 'description', content: metaDescription });
  }

  private removeMetaTags() {
    this._meta.removeTag('name=robots');
    this._meta.removeTag('name=description');
  }
}
