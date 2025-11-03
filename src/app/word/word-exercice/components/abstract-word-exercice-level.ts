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

@Directive()
export abstract class AbstractWordExerciceLevel {
  word = input.required<string>();
  next = output();

  text = signal('');
  hasFocus = signal(false);

  isTextValid = computed<boolean>(() => this.text() === this.word());

  inputEl = viewChild<ElementRef>('inputEl');

  resetEffect = effect(() => {
    this.word();

    this.text.set('');
  });

  nextEffect = effect(() => {
    if (this.isTextValid()) {
      this.next.emit();
      this.text.set('');
    }
  });

  constructor() {
    afterNextRender(() => this.focus());
  }

  onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.text.set(target.value);
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
    const text = this.text();

    let i = 0;
    while (i < word.length - 1 && word[i] === text[i]) {
      i++;
    }

    this.text.set(word.substring(0, i + 1));
  }
}
