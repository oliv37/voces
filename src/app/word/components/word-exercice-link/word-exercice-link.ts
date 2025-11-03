import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WordGroup } from '../../models/word';
import { WordGroupCompletion } from '../../services/word-group-completion';

@Component({
  selector: 'app-exercice-link',
  templateUrl: './word-exercice-link.html',
  imports: [RouterLink],
})
export class WordExerciceLink {
  private _wordGroupCompletion = inject(WordGroupCompletion);

  wordGroup = input.required<WordGroup>();

  isWordGroupCompleted = computed<boolean>(() =>
    this._wordGroupCompletion.isCompleted(this.wordGroup())
  );
}
