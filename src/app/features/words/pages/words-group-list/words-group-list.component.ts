import { Component, computed, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompletionAge, WordsGroup } from '@features/words/models/word.model';
import { WordsCompletionService } from '@features/words/services/words-completion.service';

const COMPLETION_AGE_CLASS: Record<CompletionAge, string> = {
  ['LESS_THAN_TWO_DAYS']: 'bg-black text-white bg-opacity-100',
  ['LESS_THAN_FOUR_DAYS']: 'bg-black text-white bg-opacity-60',
  ['LONG_TIME_AGO_OR_NEVER']: '',
};

@Component({
  standalone: true,
  imports: [RouterModule],
  templateUrl: './words-group-list.component.html',
})
export class WordsGroupListComponent {
  private _wordsCompletionService = inject(WordsCompletionService);

  wordsGroupList = input.required<WordsGroup[]>();
  completionAgesByWordsGroupId = computed<Record<number, CompletionAge>>(() => {
    return this.wordsGroupList().reduce((res, wordsGroup) => {
      const wordsGroupId = wordsGroup.id;
      return {
        ...res,
        [wordsGroupId]:
          this._wordsCompletionService.getCompletionAge(wordsGroupId),
      };
    }, {});
  });

  getWordsGroupHeaderClass(wordsGroupId: number): string {
    const completionAge = this.completionAgesByWordsGroupId()[wordsGroupId];
    return COMPLETION_AGE_CLASS[completionAge];
  }
}
