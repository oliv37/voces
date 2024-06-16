import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isClientSide } from '@shared/client-side.util';
import { LANG_CODES, LangCode } from '@shared/lang/lang.constant';
import { getLangLabel } from '@shared/lang/lang.util';
import { HomeWordCardComponent } from './home-word-card/home-word-card.component';

@Component({
  standalone: true,
  imports: [RouterLink, HomeWordCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  langCodes = LANG_CODES;
  clientSide = isClientSide();

  getLangLabel(langCode: LangCode): string {
    return getLangLabel(langCode);
  }
}
