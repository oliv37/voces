import { Component, input } from '@angular/core';
import { Word } from '@models/word.model';

@Component({
  selector: 'app-words-grid',
  imports: [],
  templateUrl: './words-grid.component.html',
})
export class WordsGridComponent {
  words = input.required<Word[]>();
}
