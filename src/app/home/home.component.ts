import { Component } from '@angular/core';
import { LANG_CODES, LangCode } from '../shared/constants/lang.constants';
import { getLangLabel } from '../shared/utils/lang.utils';
import { HomeRandomWordsComponent } from './random-words/home-random-words.component';
import { HomeWordCountComponent } from './word-count/home-word-count.component';
import { HomeLangTitleComponent } from './lang-title/home-lang-title.component';
import { RouterLink } from '@angular/router';
import { isClientSide } from '../shared/utils/client-side.utils';

@Component({
  standalone: true,
  imports: [
    RouterLink,
    HomeRandomWordsComponent,
    HomeWordCountComponent,
    HomeLangTitleComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  langCodes = LANG_CODES;
  clientSide = isClientSide();

  getLangLabel(langCode: LangCode): string {
    return getLangLabel(langCode);
  }
}
