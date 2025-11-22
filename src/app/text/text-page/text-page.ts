import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Text } from '../text.model';
import { TextLinks } from '../text-links/text-links';
import { TextState } from '../text-state';
import { PaginationBar } from '@shared/bar/pagination-bar/pagination-bar';
import { Meta } from '@shared/seo/meta';
import { OpenGraph } from '@shared/seo/open-graph.model';
import { TopBar } from '@shared/bar/top-bar/top-bar';

@Component({
  templateUrl: './text-page.html',
  imports: [TextLinks, PaginationBar, Meta, TopBar],
  providers: [TextState],
})
export class TextPage {
  #textState = inject(TextState);

  text = input.required<Text>();
  otherTexts = input.required<Text[]>();

  hasInputFocus = signal<boolean>(false);

  inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');

  currentPage = this.#textState.currentPage;
  completedPages = this.#textState.completedPages;
  isCompleted = this.#textState.isCompleted;
  wordIdx = this.#textState.wordIdx;
  inputTextValue = this.#textState.inputTextValue;
  words = this.#textState.words;
  word = this.#textState.word;
  wordValidationResult = this.#textState.wordValidationResult;

  setText = this.#textState.setText;
  setTextPage = this.#textState.setTextPage;
  setInputTextValue = this.#textState.setInputTextValue;

  wordLetterIdx = computed<number>(() => {
    const inputTextValue = this.inputTextValue();
    const word = this.word();

    return Math.min(inputTextValue.length, word.length - 1);
  });

  metaDescription = computed<string>(
    () => `Recopiez le texte en Espagnol "${this.text().title}".`
  );

  metaOg = computed<OpenGraph>(() => ({
    title: `Voces - ${this.text().title}`,
    description: `Voces | Texte en Espagnol "${this.text().title}"`,
  }));

  updateTextEffect = effect(() => {
    const text = this.text();
    this.setText(text);
  });

  resetInputTextValueEffect = effect(() => {
    const wordIdx = this.wordIdx();
    const inputEl = this.inputEl();

    if (inputEl && wordIdx >= 0) {
      inputEl.nativeElement.value = '';
    }
  });

  focusInputEffect = effect(() => {
    const words = this.words();
    const inputEl = this.inputEl();

    if (words && inputEl) {
      inputEl.nativeElement.focus();
    }
  });

  onKeydown(e: KeyboardEvent) {
    if (['ArrowLeft', 'ArrowRight'].includes(e.key) && !e.altKey) {
      e.preventDefault();
    }
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
    }
  }

  onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const word = this.word();
    const newInputTextValue =
      target.value.length <= word.length
        ? target.value
        : target.value.substring(0, word.length);

    target.value = newInputTextValue;
    this.setInputTextValue(newInputTextValue);
  }
}
