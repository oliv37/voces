import { Location } from '@angular/common';
import { Directive, inject, input, OnDestroy, OnInit } from '@angular/core';
import { Meta as MetaService } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import type { OpenGraph } from '@shared/models/open-graph';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'app-meta',
})
export class Meta implements OnInit, OnDestroy {
  #meta = inject(MetaService);
  #location = inject(Location);

  robots = input<string>();
  description = input<string>();
  og = input<OpenGraph>();

  ngOnInit() {
    const robots = this.robots();
    const description = this.description();
    const og = this.og();

    if (robots) {
      this.#meta.addTag({ name: 'robots', content: robots });
    }

    if (description) {
      this.#meta.addTag({ name: 'description', content: description });
    }

    if (og) {
      const ogDescription = og.description;
      const ogImage = environment.baseURI + '/icons/icon-512x512@2.png';
      const ogTitle = og.title;
      const ogUrl = environment.baseURI + this.#location.path();

      this.#meta.addTag({
        property: 'og:description',
        content: ogDescription,
      });
      this.#meta.addTag({ property: 'og:image', content: ogImage });
      this.#meta.addTag({ property: 'og:locale', content: 'fr_FR' });
      this.#meta.addTag({ property: 'og:type', content: 'website' });
      this.#meta.addTag({ property: 'og:site_name', content: 'Voces' });
      this.#meta.addTag({
        property: 'og:title',
        content: ogTitle,
      });
      this.#meta.addTag({ property: 'og:url', content: ogUrl });
    }
  }

  ngOnDestroy() {
    if (this.robots()) {
      this.#meta.removeTag("name='robots'");
    }

    if (this.description()) {
      this.#meta.removeTag("name='description'");
    }

    if (this.og()) {
      this.#meta.removeTag("property='og:description'");
      this.#meta.removeTag("property='og:image'");
      this.#meta.removeTag("property='og:locale'");
      this.#meta.removeTag("property='og:type'");
      this.#meta.removeTag("property='og:site_name'");
      this.#meta.removeTag("property='og:title'");
      this.#meta.removeTag("property='og:url'");
    }
  }
}
