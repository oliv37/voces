import { Component } from '@angular/core';
import { BtnDirective } from '@shared/directives/btn/btn.directive';

@Component({
  selector: 'app-words-exercice-button-bar',
  templateUrl: './words-exercice-button-bar.component.html',
  imports: [BtnDirective],
  standalone: true,
})
export class WordsExerciceButtonBarComponent {}
