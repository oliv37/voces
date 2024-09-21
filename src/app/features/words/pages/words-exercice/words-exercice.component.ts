import {
  Component,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { ClientSideComponent } from '@shared/components/client-side/client-side.component';
import { WordsExerciceService } from '../../services/words-exercice.service';
import { WordsExerciceStepPreviewComponent } from '../../components/words-exercice-step-preview/words-exercice-step-preview.component';
import { WordsExerciceStepFormComponent } from '../../components/words-exercice-step-form/words-exercice-step-form.component';
import { WordsCategory, WordsGroup } from '../../models/words.model';
import { WordsCompletionService } from '@features/words/services/words-completion.service';
import { WordsExerciceHeaderComponent } from '@features/words/components/words-exercice-header/words-exercice-header.component';
import { groupBy } from '@shared/utils/array.util';

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
  private _wordsCompletionService = inject(WordsCompletionService);
  wordsExerciceService = inject(WordsExerciceService);

  wordsCategory = input.required<WordsCategory>();
  wordsGroup = input.required<WordsGroup>();

  nextWordsGroup = computed<WordsGroup | undefined>(() => {
    const wordsGroups = this.wordsCategory().wordsGroups;
    const wordsGroup = this.wordsGroup();
    const otherWordsGroups = getOtherWordsGroup(wordsGroups, wordsGroup);
    const otherWordsGroupsByCompletionAge = groupBy(
      otherWordsGroups,
      (wordsGroup) => this._wordsCompletionService.getCompletionAge(wordsGroup)
    );

    return (
      otherWordsGroupsByCompletionAge['LONG_TIME_AGO_OR_NEVER']?.[0] ??
      otherWordsGroupsByCompletionAge['LESS_THAN_FOUR_DAYS']?.[0]
    );
  });

  constructor() {
    effect(() => {
      const wordsGroup = this.wordsGroup();
      // signals used inside reinit method must not be tracked
      untracked(() => this.wordsExerciceService.reinit(wordsGroup));
    });
  }
}

function getOtherWordsGroup(
  wordsGroups: WordsGroup[],
  wordsGroup: WordsGroup
): WordsGroup[] {
  const nbWordsGroups = wordsGroups.length;
  const wordsGroupIdx = wordsGroups.indexOf(wordsGroup);
  const otherWordsGroups: WordsGroup[] = [];

  for (let i = 1; i < nbWordsGroups; i++) {
    otherWordsGroups.push(wordsGroups[(wordsGroupIdx + i) % nbWordsGroups]);
  }

  return otherWordsGroups;
}
