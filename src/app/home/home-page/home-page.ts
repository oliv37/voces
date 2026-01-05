import { Component, computed, input } from '@angular/core';
import type { OpenGraph } from '@shared/seo/open-graph.model';
import type { Word } from '@word/word.model';
import type { Text } from '@text/text.model';
import { Meta } from '@shared/seo/meta';
import { BoxLink } from '@shared/link/box-link/box-link';
import { TextLinks } from '@text/text-links/text-links';

@Component({
  imports: [Meta, BoxLink, TextLinks],
  templateUrl: './home-page.html',
})
export class HomePage {
  readonly words = input.required<Word[]>();
  readonly texts = input.required<Text[]>();

  protected readonly nbWords = computed<number>(() => this.words().length);

  protected readonly metaDescription = `Vocabulaire et Textes en Espagnol.`;

  protected readonly metaOg: OpenGraph = {
    title: 'Voces - Vocabulaire et Textes en Espagnol',
    description: `Voces | Vocabulaire et Textes en Espagnol`,
  };
}
