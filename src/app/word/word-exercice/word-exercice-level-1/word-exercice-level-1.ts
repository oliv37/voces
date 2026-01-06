import {
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { pickNRandomElems, shuffle } from '@shared/misc/array';
import type { Word } from '@word/word.model';

type Choice = Word & { disabled?: boolean; hint?: boolean };

@Component({
  selector: 'app-word-exercice-level-1',
  templateUrl: './word-exercice-level-1.html',
})
export class WordExerciceLevel1 {
  readonly word = input.required<Word>();
  readonly words = input.required<Word[]>();
  readonly next = output();

  readonly #otherWords = computed<Word[]>(() =>
    this.words().filter((w) => w.id !== this.word().id)
  );

  protected readonly choices = linkedSignal<Choice[]>(() => {
    const word = this.word();
    const otherWords = this.#otherWords();

    return shuffle([word, ...pickNRandomElems(otherWords, 3)]);
  });

  validate(choice: Choice) {
    const word = this.word();
    if (choice.id !== word.id) {
      this.choices.update((prevChoices) =>
        prevChoices.map((c) =>
          c.id === choice.id ? { ...c, disabled: true } : c
        )
      );
      return;
    }

    this.next.emit();
  }

  help() {
    const word = this.word();
    this.choices.update((prevChoices) =>
      prevChoices.map((c) => (c.id === word.id ? { ...c, hint: true } : c))
    );
  }
}
