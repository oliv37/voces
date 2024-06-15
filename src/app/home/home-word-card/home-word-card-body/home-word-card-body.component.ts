import { Component, input, signal } from '@angular/core';
import { LangCode } from '@shared/lang/lang.constants';
import { Word } from '@word/word.model';
import { findAllWords, findRandomWords } from '@word/word.utils';

@Component({
  selector: 'app-home-word-card-body',
  standalone: true,
  imports: [],
  templateUrl: './home-word-card-body.component.html',
})
export class HomeWordCardBodyComponent {
  langCode = input.required<LangCode>();
  randomWords = signal<Word[]>([]);

  async ngOnInit() {
    const allWords = await findAllWords(this.langCode());
    this.randomWords.set(findRandomWords(allWords, 5));
  }
}
