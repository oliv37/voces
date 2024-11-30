import { Component, computed } from '@angular/core';
import { CaretComponent } from '../caret/caret.component';
import { ExerciceLevelComponent } from '../exercice-level.component';
import { Letter } from '@models/exercice.model';

@Component({
  selector: 'app-exercice-level-1',
  templateUrl: './exercice-level-1.component.html',
  imports: [CaretComponent],
})
export class ExerciceLevel1Component extends ExerciceLevelComponent {
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
