import {
  Component,
  effect,
  inject,
  input,
  numberAttribute,
  untracked,
} from '@angular/core';
import { ClientSideComponent } from '@shared/components/client-side/client-side.component';
import { WordsExerciceService } from '../../services/words-exercice.service';
import { WordsExerciceStepPreviewComponent } from '../../components/words-exercice-step-preview/words-exercice-step-preview.component';
import { WordsExerciceStepFormComponent } from '../../components/words-exercice-step-form/words-exercice-step-form.component';
import { WordsGroup } from '../../models/word.model';
import { WordsExerciceHeaderComponent } from '@features/words/components/words-exercice-header/words-exercice-header.component';

@Component({
  standalone: true,
  imports: [
    ClientSideComponent,
    WordsExerciceHeaderComponent,
    WordsExerciceStepPreviewComponent,
    WordsExerciceStepFormComponent,
  ],
  templateUrl: './words-group-exercice.component.html',
  providers: [WordsExerciceService],
  host: {
    tabIndex: '-1',
  },
})
export class WordsGroupExerciceComponent {
  wordsExerciceService = inject(WordsExerciceService);

  wordsGroup = input.required<WordsGroup>();
  wordsGroupId = input.required<number, string>({ transform: numberAttribute });

  constructor() {
    effect(() => {
      const wordsGroup = this.wordsGroup();
      // signals used inside reinit method must not be tracked
      untracked(() => this.wordsExerciceService.reinit(wordsGroup));
    });
  }
}
