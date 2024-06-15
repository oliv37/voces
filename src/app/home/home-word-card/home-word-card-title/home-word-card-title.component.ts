import { Component, input, signal } from '@angular/core';
import { LangCode } from '@shared/lang/lang.constants';
import { getLangLabel } from '@shared/lang/lang.utils';
import { countAllWords } from '@word/word.utils';

@Component({
  selector: 'app-home-word-card-title',
  standalone: true,
  imports: [],
  templateUrl: './home-word-card-title.component.html',
})
export class HomeWordCardTitleComponent {
  langCode = input.required<LangCode>();
  nbWords = signal<number | undefined>(undefined);

  async ngOnInit() {
    this.nbWords.set(await countAllWords(this.langCode()));
  }

  getLangLabel(langCode: LangCode): string {
    return getLangLabel(langCode);
  }
}
