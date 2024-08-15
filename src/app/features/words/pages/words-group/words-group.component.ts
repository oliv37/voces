import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WordsGroup } from '../../models/word.model';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './words-group.component.html',
  host: {
    tabIndex: '-1',
    class: 'outline-none',
  },
})
export class WordsGroupComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  elementRef = inject(ElementRef);

  wordsGroup = input.required<WordsGroup>();

  constructor() {
    afterNextRender(() => this.elementRef.nativeElement.focus());
  }

  @HostListener('keydown.Enter')
  handleKeyboardEvent() {
    this.router.navigate(['exercice'], { relativeTo: this.route });
  }
}
