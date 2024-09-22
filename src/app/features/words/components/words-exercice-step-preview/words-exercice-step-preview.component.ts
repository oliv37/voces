import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { WordsExerciceService } from '../../services/words-exercice.service';
import { WordsExerciceButtonBarComponent } from '../words-exercice-button-bar/words-exercice-button-bar.component';
import { RouterLink } from '@angular/router';
import { WordsGroup } from '@features/words/models/words.model';
import { ignoreEventTarget } from '@shared/decorators/ignore-event-target.decorator';
import { BtnDirective } from '@shared/directives/btn/btn.directive';

@Component({
  selector: 'app-words-exercice-step-preview',
  standalone: true,
  templateUrl: './words-exercice-step-preview.component.html',
  imports: [WordsExerciceButtonBarComponent, RouterLink, BtnDirective],
  host: {
    tabIndex: '-1',
    class: 'outline-none',
  },
})
export class WordsExerciceStepPreviewComponent {
  private _elementRef = inject(ElementRef);
  wordsExerciceService = inject(WordsExerciceService);

  nextWordsGroup = input<WordsGroup>();

  nextWordGroupPathParam = computed<string | undefined>(() => {
    const areAllWordsAnswered = this.wordsExerciceService.areAllWordsAnswered();
    return areAllWordsAnswered ? this.nextWordsGroup()?.pathParam : undefined;
  });

  constructor() {
    afterNextRender(() => this._elementRef.nativeElement.focus());
  }

  @HostListener('keydown.Enter', ['$event'])
  @ignoreEventTarget('button', 'a')
  onEnter() {
    this.wordsExerciceService.goToNextStep();
  }
}
