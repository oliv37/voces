import { Component, input } from '@angular/core';

@Component({
  selector: 'app-exercice-caret',
  templateUrl: './exercice-caret.html',
})
export class ExerciceCaret {
  active = input.required<boolean>();
}
