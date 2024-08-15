import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-words-exercice-footer',
  templateUrl: './words-exercice-footer.component.html',
  standalone: true,
})
export class WordsExerciceFooterComponent {
  previousBtnText = input('');
  nextBtnText = input('');

  previousBtnDisabled = input(false);
  nextBtnDisabled = input(false);

  @Output() previousBtnClick = new EventEmitter<void>();
  @Output() nextBtnClick = new EventEmitter<void>();
}
