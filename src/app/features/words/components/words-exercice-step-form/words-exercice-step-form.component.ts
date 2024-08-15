import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  inject,
  afterNextRender,
  HostListener,
} from '@angular/core';
import { WordsExerciceService } from '../../services/words-exercice.service';
import { WordsExerciceFooterComponent } from '../words-exercice-footer/words-exercice-footer.component';

@Component({
  selector: 'app-words-exercice-step-form',
  standalone: true,
  templateUrl: './words-exercice-step-form.component.html',
  imports: [WordsExerciceFooterComponent],
  host: {
    tabIndex: '-1',
  },
})
export class WordsExerciceStepFormComponent {
  wordsExerciceService = inject(WordsExerciceService);

  @ViewChildren('formInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor() {
    afterNextRender(() => {
      this.inputs
        .get(this.wordsExerciceService.lastInputFocusIndex())
        ?.nativeElement?.focus();
    });
  }

  onInput(index: number, event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.wordsExerciceService.setFormValue(index, value);

    if (this.wordsExerciceService.isFormValueValid(index)) {
      this.focusNextInvalidFormInput(index);
    }
  }

  @HostListener('keydown.Enter')
  onEnter() {
    if (this.wordsExerciceService.isFormWin()) {
      this.wordsExerciceService.goToNextStep();
    } else {
      this.wordsExerciceService.goToPreviousStep();
    }
  }

  private focusNextInvalidFormInput(currentIndex: number): void {
    const nextIndex = this.findNextInvalidFormInputIndex(currentIndex);
    if (nextIndex >= 0) {
      this.inputs.get(nextIndex)?.nativeElement?.focus();
    }
  }

  private findNextInvalidFormInputIndex(currentIndex: number): number {
    const nbFormValues = this.wordsExerciceService.nbFormValues();

    for (let i = 0; i < nbFormValues; i++) {
      const nextIndex = (currentIndex + i + 1) % nbFormValues;
      if (!this.wordsExerciceService.isFormValueValid(nextIndex)) {
        return nextIndex;
      }
    }

    return -1;
  }
}
