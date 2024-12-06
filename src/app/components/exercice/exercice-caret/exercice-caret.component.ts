import { Component, input } from '@angular/core';

@Component({
  selector: 'app-exercice-caret',
  templateUrl: './exercice-caret.component.html',
})
export class ExerciceCaretComponent {
  active = input.required<boolean>();
}
