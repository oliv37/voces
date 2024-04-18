import { Component, input } from '@angular/core';
import { LangCode } from '../../shared/constants/lang.constants';
import { getLangLabel } from '../../shared/utils/lang.utils';

@Component({
  selector: 'app-home-lang-title',
  standalone: true,
  templateUrl: './home-lang-title.component.html',
})
export class HomeLangTitleComponent {
  langCode = input.required<LangCode>();

  getLangLabel(langCode: LangCode): string {
    return getLangLabel(langCode);
  }
}
