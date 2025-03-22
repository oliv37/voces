import { Component, input } from '@angular/core';
import { Word } from '@models/word.model';
import { fadeIn } from '@animations/fade-in.animation';

@Component({
  selector: 'app-words-grid',
  imports: [],
  templateUrl: './words-grid.component.html',
  animations: [fadeIn('.word', '30ms', '0.4s')],
})
export class WordsGridComponent {
  words = input.required<Word[]>();
}
