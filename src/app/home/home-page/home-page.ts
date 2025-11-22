import { Component, input } from '@angular/core';
import type { OpenGraph } from '@shared/models/open-graph';
import { Meta } from '@shared/directives/meta';
import { Text } from '@text/text';
import { BoxLink } from '@shared/components/box-link/box-link';
import { TextLinks } from '@text/text-links/text-links';

@Component({
  imports: [Meta, BoxLink, TextLinks],
  templateUrl: './home-page.html',
})
export class HomePage {
  nbWords = input.required<number>();
  texts = input.required<Text[]>();

  metaDescription = `Vocabulaire et Textes en Espagnol.`;

  metaOg: OpenGraph = {
    title: 'Voces - Vocabulaire et Textes en Espagnol',
    description: `Voces | Vocabulaire et Textes en Espagnol`,
  };
}
