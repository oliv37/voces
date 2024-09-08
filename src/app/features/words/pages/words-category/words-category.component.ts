import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  WordsCategory,
  WordsGroup,
  WordsGroupCompletionAge,
} from '@features/words/models/word.model';
import { WordsGroupCompletionService } from '@features/words/services/words-group-completion.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './words-category.component.html',
})
export class WordsCategoryComponent {
  private _wordsGroupCompletionService = inject(WordsGroupCompletionService);

  wordsCategory = input.required<WordsCategory>();

  wordsGroups = computed<WordsGroupWithCompletionAge[]>(() => {
    return this.wordsCategory().wordsGroups.map((wordsGroup) => ({
      ...wordsGroup,
      completionAge:
        this._wordsGroupCompletionService.getCompletionAge(wordsGroup),
    }));
  });

  getHeaderClass(completionAge: WordsGroupCompletionAge) {
    return HEADER_CLASS_BY_COMPLETION_AGE[completionAge];
  }
}

const HEADER_CLASS_BY_COMPLETION_AGE: Record<WordsGroupCompletionAge, string> =
  {
    ['LESS_THAN_TWO_DAYS']: 'bg-black text-white bg-opacity-100',
    ['LESS_THAN_FOUR_DAYS']: 'bg-black text-white bg-opacity-60',
    ['LONG_TIME_AGO_OR_NEVER']: '',
  };

type WordsGroupWithCompletionAge = WordsGroup & {
  completionAge: WordsGroupCompletionAge;
};
