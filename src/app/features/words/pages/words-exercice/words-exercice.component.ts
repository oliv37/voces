import { Component, effect, inject, input, untracked } from '@angular/core';
import { ClientSideComponent } from '@shared/components/client-side/client-side.component';
import { WordsExerciceService } from '../../services/words-exercice.service';
import { WordsExerciceStepPreviewComponent } from '../../components/words-exercice-step-preview/words-exercice-step-preview.component';
import { WordsExerciceStepFormComponent } from '../../components/words-exercice-step-form/words-exercice-step-form.component';
import { WordsCategory, WordsGroup } from '../../models/words.model';
import { WordsExerciceHeaderComponent } from '@features/words/components/words-exercice-header/words-exercice-header.component';

@Component({
  standalone: true,
  imports: [
    ClientSideComponent,
    WordsExerciceHeaderComponent,
    WordsExerciceStepPreviewComponent,
    WordsExerciceStepFormComponent,
  ],
  templateUrl: './words-exercice.component.html',
  providers: [WordsExerciceService],
  host: {
    tabIndex: '-1',
  },
})
export class WordsExerciceComponent {
  wordsExerciceService = inject(WordsExerciceService);

  wordsCategory = input.required<WordsCategory>();
  wordsGroup = input.required<WordsGroup>();

  constructor() {
    effect(() => {
      const wordsCategory = this.wordsCategory();
      const wordsGroup = this.wordsGroup();
      // signals used inside reinit method must not be tracked
      untracked(() =>
        this.wordsExerciceService.reinit(wordsCategory, wordsGroup)
      );
    });
  }
}
