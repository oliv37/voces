import { Component, computed } from '@angular/core';
import { ExerciceCaretComponent } from '../exercice-caret/exercice-caret.component';
import { AbstractExerciceLevelComponent } from '../abstract-exercice-level.component';
import { Letter } from '@models/exercice.model';

@Component({
  selector: 'app-exercice-level-1',
  templateUrl: './exercice-level-1.component.html',
  imports: [ExerciceCaretComponent],
})
export class ExerciceLevel1Component extends AbstractExerciceLevelComponent {
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
}
