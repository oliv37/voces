import { Component, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LangCode } from '../../shared/constants/lang.constants';
import { WordBreadcrumbComponent } from '../breadcrumb/word-breadcrumb.component';
import { Word } from '../word.model';
import { getLangLabel } from '../../shared/utils/lang.utils';

@Component({
  standalone: true,
  imports: [RouterOutlet, WordBreadcrumbComponent],
  templateUrl: './word-home.component.html',
})
export class WordHomeComponent {
  words = input.required<Word[]>();
  langCode = input.required<LangCode>();
  langLabel = computed(() => getLangLabel(this.langCode()));
}
