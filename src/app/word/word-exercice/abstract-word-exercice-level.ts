import {
  afterNextRender,
  computed,
  Directive,
  effect,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { WordValidator, WordValidationResult } from '../word.model';
import { CleanWordValidator } from '../clean-word-validator';

@Directive()
export abstract class AbstractWordExerciceLevel {
  word = input.required<string>();
  next = output();

  inputTextValue = signal('');
  hasFocus = signal(false);

  #wordValidator = computed<WordValidator>(() => {
    const word = this.word();

    return new CleanWordValidator(word);
  });

  wordValidationResult = computed<WordValidationResult>(() => {
    const inputTextValue = this.inputTextValue();
    const wordValidator = this.#wordValidator();

    return wordValidator.validate(inputTextValue);
  });

  inputEl = viewChild<ElementRef>('inputEl');

  resetEffect = effect(() => {
    this.word();

    this.inputTextValue.set('');
  });

  nextEffect = effect(() => {
    const wordValidationResult = this.wordValidationResult();

    if (wordValidationResult.isValid) {
      this.next.emit();
      this.inputTextValue.set('');
    }
  });

  constructor() {
    afterNextRender(() => this.focus());
  }

  onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.inputTextValue.set(target.value);
  }

  onKeydown(e: KeyboardEvent) {
    if (['ArrowLeft', 'ArrowRight'].includes(e.key) && !e.altKey) {
      e.preventDefault();
    }
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
    }
  }

  focus() {
    this.inputEl()?.nativeElement.focus();
  }

  help() {
    const word = this.word();
    const inputTextValue = this.inputTextValue();

    let i = 0;
    while (i < word.length - 1 && word[i] === inputTextValue[i]) {
      i++;
    }

    this.inputTextValue.set(word.substring(0, i + 1));
  }
}
