import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-words-exercice-button-bar',
  templateUrl: './words-exercice-button-bar.component.html',
  standalone: true,
})
export class WordsExerciceButtonBarComponent {
  previousBtnText = input('');
  nextBtnText = input('');

  previousBtnDisabled = input(false);
  nextBtnDisabled = input(false);

  @Output() previousBtnClick = new EventEmitter<void>();
  @Output() nextBtnClick = new EventEmitter<void>();
}
