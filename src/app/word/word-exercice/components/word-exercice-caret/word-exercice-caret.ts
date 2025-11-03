import { Component, input } from '@angular/core';

@Component({
  selector: 'app-word-exercice-caret',
  templateUrl: './word-exercice-caret.html',
})
export class WordExerciceCaret {
  active = input.required<boolean>();
}
