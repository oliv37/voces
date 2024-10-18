import { Component, input } from '@angular/core';

@Component({
  selector: 'app-exercice-header',
  templateUrl: './exercice-header.component.html',
  standalone: true,
})
export class ExerciceHeaderComponent {
  nbWordsAnswered = input.required<number>();
  nbWordsAvailable = input.required<number>();
  areAllWordsAnswered = input.required<boolean>();
}
