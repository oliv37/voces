import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WordGroup } from '../../word.model';
import { WordGroupCompletion } from '../../word-group-completion';

@Component({
  selector: 'app-exercice-link',
  templateUrl: './word-exercice-link.html',
  imports: [RouterLink],
})
export class WordExerciceLink {
  readonly #wordGroupCompletion = inject(WordGroupCompletion);

  readonly wordGroup = input.required<WordGroup>();

  protected readonly isWordGroupCompleted = computed<boolean>(() =>
    this.#wordGroupCompletion.isCompleted(this.wordGroup())
  );
}
