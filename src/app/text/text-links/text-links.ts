import { Component, computed, inject, input } from '@angular/core';
import { Text } from '../text';
import { BoxLink } from '@shared/components/box-link/box-link';
import { TextCompletion } from '@text/text-completion';
import { isCompleted } from '@text/text-completion-util';

type TextInfo = Text & {
  description: string;
  isCompleted: boolean;
};

@Component({
  selector: 'app-text-links',
  templateUrl: 'text-links.html',
  imports: [BoxLink],
})
export class TextLinks {
  #textCompletion = inject(TextCompletion);

  title = input<string>();
  texts = input.required<Text[]>();
  maxNbDescriptionWords = input<number>(40);

  textInfos = computed<TextInfo[]>(() => {
    const texts = this.texts();
    const textCompletions = this.#textCompletion.textCompletions();
    const nbDescriptionWords = this.maxNbDescriptionWords();

    return texts.map((text) => ({
      ...text,
      description: buildDescription(text, nbDescriptionWords),
      isCompleted: isCompleted(textCompletions, text),
    }));
  });
}

function buildDescription(text: Text, maxNbDescriptionWords: number): string {
  const firstContentWords = text.contents[0].split(' ');
  const nbDescriptionWords = Math.min(
    maxNbDescriptionWords,
    firstContentWords.length
  );
  return firstContentWords.slice(0, nbDescriptionWords).join(' ') + ' ... ';
}
