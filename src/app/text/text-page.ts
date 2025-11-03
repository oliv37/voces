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
import { Text } from './models/text';
import { TextLinks } from './components/text-links/text-links';
import { TextState } from './services/text-state';
import { PaginationBar } from '@shared/components/pagination-bar/pagination-bar';

@Component({
  templateUrl: './text-page.html',
  imports: [TextLinks, PaginationBar],
  providers: [TextState],
})
export class TextPage {
  #textState = inject(TextState);

  text = input.required<Text>();
  otherTexts = input.required<Text[]>();

  hasInputFocus = signal<boolean>(false);

  inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');

  textContentIdx = this.#textState.textContentIdx;
  wordIdx = this.#textState.wordIdx;
  inputTextValue = this.#textState.inputTextValue;
  textContent = this.#textState.textContent;
  words = this.#textState.words;
  word = this.#textState.word;
  wordValidatorResult = this.#textState.wordValidatorResult;

  setText = this.#textState.setText;
  setTextContentIdx = this.#textState.setTextContentIdx;
  setInputTextValue = this.#textState.setInputTextValue;

  wordLetterIdx = computed<number>(() => {
    const inputTextValue = this.inputTextValue();
    const word = this.word();

    return Math.min(inputTextValue.length, word.length - 1);
  });

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
    const textContent = this.textContent();
    const inputEl = this.inputEl();

    if (textContent && inputEl) {
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
