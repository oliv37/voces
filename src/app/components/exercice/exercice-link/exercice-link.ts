import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WordGroup } from '@models/word';
import { WordGroupCompletion } from '@services/word-group-completion';

@Component({
  selector: 'app-exercice-link',
  templateUrl: './exercice-link.html',
  imports: [RouterLink],
})
export class ExerciceLink {
  private _wordGroupCompletion = inject(WordGroupCompletion);

  wordGroup = input.required<WordGroup>();

  isCompleted = computed<boolean>(() =>
    this._wordGroupCompletion.isCompleted(this.wordGroup())
  );
}
