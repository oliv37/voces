import { Component, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LANG, LANG_LABELS } from '../../shared/lang.constants';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './word-home.component.html',
})
export class WordHomeComponent {
  lang = input.required<LANG>();
  langLabel = computed(() => LANG_LABELS[this.lang()]);
}
