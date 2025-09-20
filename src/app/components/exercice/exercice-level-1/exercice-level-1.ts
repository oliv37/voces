import { Component, computed, input } from '@angular/core';
import type { Letter } from '@models/exercice';
import { ExerciceCaret } from '@components/exercice//exercice-caret/exercice-caret';
import { AbstractExerciceLevel } from '@components/exercice/abstract-exercice-level';

@Component({
  selector: 'app-exercice-level-1',
  templateUrl: './exercice-level-1.html',
  imports: [ExerciceCaret],
})
export class ExerciceLevel1 extends AbstractExerciceLevel {
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
