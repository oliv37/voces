import { Component, computed, input } from '@angular/core';
import { Text } from '../text';
import { BoxLink } from '@shared/components/box-link/box-link';

@Component({
  selector: 'app-text-links',
  templateUrl: 'text-links.html',
  imports: [BoxLink],
})
export class TextLinks {
  title = input<string>();
  texts = input.required<Text[]>();
  nbDescriptionWords = input<number>(20);

  textsWithDescription = computed<({ description: string } & Text)[]>(() =>
    this.texts().map((text) => ({
      ...text,
      description: this.#buildDescription(text),
    }))
  );

  #buildDescription(text: Text): string {
    const firstContentWords = text.contents[0].split(' ');
    const nbDescriptionWords = Math.min(
      this.nbDescriptionWords(),
      firstContentWords.length
    );
    return firstContentWords.slice(0, nbDescriptionWords).join(' ') + ' ... ';
  }
}
