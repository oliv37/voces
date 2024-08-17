import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NB_WORDS_GROUPS } from '@features/words/utils/words.util';

@Component({
  selector: 'app-words-exercice-header',
  templateUrl: './words-exercice-header.component.html',
  imports: [RouterLink],
  standalone: true,
})
export class WordsExerciceHeaderComponent {
  nbWordsAnswered = input.required<number>();
  nbWordsAvailable = input.required<number>();
  wordsGroupId = input.required<number>();

  areAllWordsAnswered = computed<boolean>(
    () => this.nbWordsAnswered() >= this.nbWordsAvailable()
  );
  previousWordsGroupId = computed<number | undefined>(() =>
    this.wordsGroupId() > 1 ? this.wordsGroupId() - 1 : undefined
  );
  nextWordsGroupId = computed<number | undefined>(() =>
    this.wordsGroupId() < NB_WORDS_GROUPS ? this.wordsGroupId() + 1 : undefined
  );
}
