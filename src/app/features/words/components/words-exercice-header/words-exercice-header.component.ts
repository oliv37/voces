import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-words-exercice-header',
  templateUrl: './words-exercice-header.component.html',
  standalone: true,
})
export class WordsExerciceHeaderComponent {
  nbWordsAnswered = input.required<number>();
  nbWordsAvailable = input.required<number>();
  areAllWordsAnswered = input.required<boolean>();
}
