import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WordsCategory, WordsGroup } from '@features/words/models/words.model';
import { WordsCompletionAge } from '@features/words/models/words-completion.model';
import { WordsCompletionService } from '@features/words/services/words-completion.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './words-category.component.html',
})
export class WordsCategoryComponent {
  private _wordsCompletionService = inject(WordsCompletionService);

  wordsCategory = input.required<WordsCategory>();

  wordsGroups = computed<WordsGroupWithCompletionAge[]>(() => {
    return this.wordsCategory().wordsGroups.map((wordsGroup) => ({
      ...wordsGroup,
      completionAge: this._wordsCompletionService.getCompletionAge(wordsGroup),
    }));
  });

  getHeaderClass(completionAge: WordsCompletionAge) {
    return HEADER_CLASS_BY_COMPLETION_AGE[completionAge];
  }
}

const HEADER_CLASS_BY_COMPLETION_AGE: Record<WordsCompletionAge, string> = {
  ['LESS_THAN_TWO_DAYS']: 'bg-black text-white bg-opacity-100',
  ['LESS_THAN_FOUR_DAYS']: 'bg-black text-white bg-opacity-60',
  ['LONG_TIME_AGO_OR_NEVER']: '',
};

type WordsGroupWithCompletionAge = WordsGroup & {
  completionAge: WordsCompletionAge;
};
