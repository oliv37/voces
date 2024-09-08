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
import { WordsCategory, WordsGroup } from '../../models/word.model';
import { WordsGroupCompletionService } from '@features/words/services/words-group-completion.service';
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
  templateUrl: './words-group-exercice.component.html',
  providers: [WordsExerciceService],
  host: {
    tabIndex: '-1',
  },
})
export class WordsGroupExerciceComponent {
  private _wordsGroupCompletionService = inject(WordsGroupCompletionService);
  wordsExerciceService = inject(WordsExerciceService);

  wordsCategory = input.required<WordsCategory>();
  wordsGroup = input.required<WordsGroup>();

  nextWordsGroup = computed<WordsGroup | undefined>(() => {
    const wordsGroups = this.wordsCategory().wordsGroups;
    const wordsGroup = this.wordsGroup();
    const otherWordsGroups = getOtherWordsGroup(wordsGroups, wordsGroup);
    const otherWordsGroupsByCompletionAge = groupBy(
      otherWordsGroups,
      (wordsGroup) =>
        this._wordsGroupCompletionService.getCompletionAge(wordsGroup)
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

function getOtherWordsGroup(wordsGroups: WordsGroup[], wordsGroup: WordsGroup) {
  const nbWordsGroups = wordsGroups.length;
  const otherWordsGroups = wordsGroups.filter(
    (otherWordsGroup) => otherWordsGroup.id !== wordsGroup.id
  );
  const wordsGroupIdx = wordsGroups.indexOf(wordsGroup);

  otherWordsGroups.sort((wordsGroup1, wordsGroup2) => {
    const wordsGroup1Idx = wordsGroups.indexOf(wordsGroup1);
    const wordsGroup2Idx = wordsGroups.indexOf(wordsGroup2);

    const distance1 =
      (wordsGroup1Idx - wordsGroupIdx + nbWordsGroups) % nbWordsGroups;
    const distance2 =
      (wordsGroup2Idx - wordsGroupIdx + nbWordsGroups) % nbWordsGroups;
    return distance1 - distance2;
  });

  return otherWordsGroups;
}
