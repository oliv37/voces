import { Component, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LANG, LANG_LABELS } from '../../shared/lang.constants';
import { WordBreadcrumbComponent } from '../breadcrumb/word-breadcrumb.component';
import { Word } from '../word.model';

@Component({
  standalone: true,
  imports: [RouterOutlet, WordBreadcrumbComponent],
  templateUrl: './word-home.component.html',
})
export class WordHomeComponent {
  words = input.required<Word[]>();
  lang = input.required<LANG>();
  langLabel = computed(() => LANG_LABELS[this.lang()]);
}
