import { Component, computed, input } from '@angular/core';
import type { Letter } from '../../models/word-exercice';
import { WordExerciceCaret } from '../word-exercice-caret/word-exercice-caret';
import { AbstractWordExerciceLevel } from '../abstract-word-exercice-level';

@Component({
  selector: 'app-word-exercice-level-1',
  templateUrl: './word-exercice-level-1.html',
  imports: [WordExerciceCaret],
})
export class WordExerciceLevel1 extends AbstractWordExerciceLevel {
  example = input<string>();

  letters = computed<Letter[]>(() => {
    const text = this.text();

    return this.word()
      .split('')
      .map((wordLetter, idx) => {
        const status =
          text.length <= idx
            ? 'UNKNOWN'
            : wordLetter === text[idx]
            ? 'VALID'
            : 'INVALID';

        return {
          value: wordLetter,
          status,
        };
      });
  });

  override onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const maxLength = this.word().length;

    if (target.value.length > maxLength) {
      target.value = this.text();
      return;
    }

    this.text.set(target.value);
  }
}
