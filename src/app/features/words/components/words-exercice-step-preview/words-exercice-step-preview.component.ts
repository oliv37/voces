import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { WordsExerciceService } from '../../services/words-exercice.service';
import { WordsExerciceButtonBarComponent } from '../words-exercice-button-bar/words-exercice-button-bar.component';
import { RouterLink } from '@angular/router';
import { WordsGroup } from '@features/words/models/word.model';

@Component({
  selector: 'app-words-exercice-step-preview',
  standalone: true,
  templateUrl: './words-exercice-step-preview.component.html',
  imports: [WordsExerciceButtonBarComponent, RouterLink],
  host: {
    tabIndex: '-1',
    class: 'outline-none',
  },
})
export class WordsExerciceStepPreviewComponent {
  private _elementRef = inject(ElementRef);
  wordsExerciceService = inject(WordsExerciceService);

  nextWordsGroup = input<WordsGroup>();

  constructor() {
    afterNextRender(() => this._elementRef.nativeElement.focus());
  }

  @HostListener('keydown.Enter')
  onEnter() {
    this.wordsExerciceService.goToNextStep();
  }
}
