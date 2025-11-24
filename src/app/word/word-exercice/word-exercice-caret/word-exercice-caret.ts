import { Component, input } from '@angular/core';

@Component({
  selector: 'app-word-exercice-caret',
  templateUrl: './word-exercice-caret.html',
})
export class WordExerciceCaret {
  readonly active = input.required<boolean>();
}
