import { Component, computed } from '@angular/core';
import { CaretComponent } from '../caret/caret.component';
import { Letter } from '@models/exercice.model';
import { ExerciceLevelComponent } from '../exercice-level.component';

@Component({
  selector: 'app-exercice-level-2',
  templateUrl: './exercice-level-2.component.html',
  imports: [CaretComponent],
})
export class ExerciceLevel2Component extends ExerciceLevelComponent {
  letters = computed<Letter[]>(() => {
    const text = this.text();

    return this.word()
      .split('')
      .map((wordLetter, idx) => {
        const value =
          idx < text.length ? text[idx] : wordLetter.replace(' ', '-');
        const status =
          idx >= text.length
            ? 'UNKNOWN'
            : wordLetter === text[idx]
            ? 'VALID'
            : 'INVALID';

        return {
          value,
          status,
        };
      });
  });
}
