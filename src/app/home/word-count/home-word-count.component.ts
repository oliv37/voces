import { Component, OnInit, input } from '@angular/core';
import { LangCode } from '../../shared/constants/lang.constants';
import { countAllWords } from '../../word/word.utils';

@Component({
  selector: 'app-home-word-count',
  standalone: true,
  templateUrl: './home-word-count.component.html',
})
export class HomeWordCountComponent implements OnInit {
  langCode = input.required<LangCode>();
  nbWords: number | undefined;

  async ngOnInit() {
    this.nbWords = await countAllWords(this.langCode());
  }
}
