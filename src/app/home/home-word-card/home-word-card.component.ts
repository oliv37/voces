import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isClientSide } from '@shared/client-side.util';
import { LangCode } from '@shared/lang/lang.constant';
import { getLangLabel } from '@shared/lang/lang.util';
import { HomeWordCardTitleComponent } from './home-word-card-title/home-word-card-title.component';
import { HomeWordCardBodyComponent } from './home-word-card-body/home-word-card-body.component';

@Component({
  selector: 'app-home-word-card',
  standalone: true,
  imports: [RouterLink, HomeWordCardTitleComponent, HomeWordCardBodyComponent],
  templateUrl: './home-word-card.component.html',
  host: { class: 'w-5/12' },
})
export class HomeWordCardComponent {
  langCode = input.required<LangCode>();

  clientSide = isClientSide();

  getLangLabel(langCode: LangCode): string {
    return getLangLabel(langCode);
  }
}
