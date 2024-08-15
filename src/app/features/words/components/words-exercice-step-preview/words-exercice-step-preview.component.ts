import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { WordsExerciceService } from '../../services/words-exercice.service';
import { WordsExerciceFooterComponent } from '../words-exercice-footer/words-exercice-footer.component';

@Component({
  selector: 'app-words-exercice-step-preview',
  standalone: true,
  templateUrl: './words-exercice-step-preview.component.html',
  imports: [WordsExerciceFooterComponent],
  host: {
    tabIndex: '-1',
    class: 'outline-none',
  },
})
export class WordsExerciceStepPreviewComponent {
  elementRef = inject(ElementRef);
  wordsExerciceService = inject(WordsExerciceService);

  constructor() {
    afterNextRender(() => this.elementRef.nativeElement.focus());
  }

  @HostListener('keydown.Enter')
  onEnter() {
    this.wordsExerciceService.goToNextStep();
  }
}
