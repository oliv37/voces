import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  Signal,
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
import { WordValidationResult } from '@word/word.model';

@Component({
  templateUrl: './text-page.html',
  imports: [TextLinks, PaginationBar, Meta, TopBar],
  providers: [TextState],
})
export class TextPage {
  readonly #textState = inject(TextState);

  readonly text = input.required<Text>();
  readonly otherTexts = input.required<Text[]>();

  protected readonly hasInputFocus = signal<boolean>(false);

  protected readonly inputEl =
    viewChild<ElementRef<HTMLInputElement>>('inputEl');

  readonly currentPage: Signal<number> = this.#textState.currentPage;
  readonly completedPages: Signal<number[]> = this.#textState.completedPages;
  readonly isCompleted: Signal<boolean> = this.#textState.isCompleted;
  readonly wordIdx: Signal<number> = this.#textState.wordIdx;
  readonly inputTextValue: Signal<string> = this.#textState.inputTextValue;
  readonly words: Signal<string[]> = this.#textState.words;
  readonly word: Signal<string> = this.#textState.word;
  readonly wordValidationResult: Signal<WordValidationResult> =
    this.#textState.wordValidationResult;

  readonly setText = this.#textState.setText;
  readonly setTextPage = this.#textState.setTextPage;
  readonly setInputTextValue = this.#textState.setInputTextValue;

  protected readonly wordLetterIdx = computed<number>(() => {
    const inputTextValue = this.inputTextValue();
    const word = this.word();

    return Math.min(inputTextValue.length, word.length - 1);
  });

  protected readonly metaDescription = computed<string>(
    () => `Recopiez le texte en Espagnol "${this.text().title}".`
  );

  protected readonly metaOg = computed<OpenGraph>(() => ({
    title: `Voces - ${this.text().title}`,
    description: `Voces | Texte en Espagnol "${this.text().title}"`,
  }));

  protected readonly updateTextEffect = effect(() => {
    const text = this.text();
    this.setText(text);
  });

  protected readonly resetInputTextValueEffect = effect(() => {
    const wordIdx = this.wordIdx();
    const inputEl = this.inputEl();

    if (inputEl && wordIdx >= 0) {
      inputEl.nativeElement.value = '';
    }
  });

  protected readonly focusInputEffect = effect(() => {
    const words = this.words();
    const inputEl = this.inputEl();

    if (words && inputEl) {
      inputEl.nativeElement.focus();
    }
  });

  protected onKeydown(e: KeyboardEvent) {
    if (['ArrowLeft', 'ArrowRight'].includes(e.key) && !e.altKey) {
      e.preventDefault();
    }
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
    }
  }

  protected onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const word = this.word();
    const newInputTextValue =
      target.value.length <= word.length
        ? target.value
        : target.value.substring(0, word.length);

    target.value = newInputTextValue;
    this.setInputTextValue(newInputTextValue);
  }

  protected onFocus() {
    this.hasInputFocus.set(true);
  }

  protected onBlur() {
    this.hasInputFocus.set(false);
    this.setInputTextValue('');
  }
}
