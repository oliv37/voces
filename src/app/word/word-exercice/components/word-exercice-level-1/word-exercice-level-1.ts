import { Component, input } from '@angular/core';
import { WordExerciceCaret } from '../word-exercice-caret/word-exercice-caret';
import { AbstractWordExerciceLevel } from '../abstract-word-exercice-level';

@Component({
  selector: 'app-word-exercice-level-1',
  templateUrl: './word-exercice-level-1.html',
  imports: [WordExerciceCaret],
})
export class WordExerciceLevel1 extends AbstractWordExerciceLevel {
  example = input<string>();

  override onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const word = this.word();
    const newInputTextValue =
      target.value.length <= word.length
        ? target.value
        : target.value.substring(0, word.length);

    target.value = newInputTextValue;
    this.inputTextValue.set(newInputTextValue);
  }
}
