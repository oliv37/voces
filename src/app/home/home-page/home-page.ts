import { Component, input } from '@angular/core';
import type { OpenGraph } from '@shared/seo/open-graph.model';
import { Meta } from '@shared/seo/meta';
import { Text } from '@text/text.model';
import { BoxLink } from '@shared/link/box-link/box-link';
import { TextLinks } from '@text/text-links/text-links';

@Component({
  imports: [Meta, BoxLink, TextLinks],
  templateUrl: './home-page.html',
})
export class HomePage {
  readonly nbWords = input.required<number>();
  readonly texts = input.required<Text[]>();

  protected readonly metaDescription = `Vocabulaire et Textes en Espagnol.`;

  protected readonly metaOg: OpenGraph = {
    title: 'Voces - Vocabulaire et Textes en Espagnol',
    description: `Voces | Vocabulaire et Textes en Espagnol`,
  };
}
