import { Component, OnInit, input } from '@angular/core';
import { LangCode } from '../../shared/constants/lang.constants';
import { Word } from '../../word/word.model';
import { findAllWords, findRandomWords } from '../../word/word.utils';

@Component({
  selector: 'app-home-random-words',
  standalone: true,
  templateUrl: './home-random-words.component.html',
})
export class HomeRandomWordsComponent implements OnInit {
  langCode = input.required<LangCode>();
  randomWords: Word[] = [];

  async ngOnInit() {
    const allWords = await findAllWords(this.langCode());
    this.randomWords = findRandomWords(allWords, 10);
  }
}
