import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  inject,
  HostListener,
  effect,
  untracked,
} from '@angular/core';
import { WordsExerciceService } from '../../services/words-exercice.service';
import { WordsExerciceButtonBarComponent } from '../words-exercice-button-bar/words-exercice-button-bar.component';
import { ignoreEventTarget } from '@shared/decorators/ignore-event-target.decorator';

@Component({
  selector: 'app-words-exercice-step-form',
  standalone: true,
  templateUrl: './words-exercice-step-form.component.html',
  imports: [WordsExerciceButtonBarComponent],
  host: {
    tabIndex: '-1',
    class: 'outline-none',
  },
})
export class WordsExerciceStepFormComponent {
  private _elementRef = inject(ElementRef);

  wordsExerciceService = inject(WordsExerciceService);

  @ViewChildren('formInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor() {
    // [Effect] focus next input
    effect(() => {
      const nbFormValues = this.wordsExerciceService.nbFormValues();
      const nbFormValuesValid = this.wordsExerciceService.nbFormValuesValid();

      const areAllFormValuesValid = nbFormValuesValid >= nbFormValues;
      if (areAllFormValuesValid) {
        this._elementRef?.nativeElement?.focus();
        return;
      }

      untracked(() => {
        const lastFocusIndex = this.wordsExerciceService.lastInputFocusIndex();
        for (let i = 0; i < nbFormValues; i++) {
          const idx = (lastFocusIndex + i) % nbFormValues;
          const isFormValueValid =
            this.wordsExerciceService.isFormValueValid(idx);
          if (!isFormValueValid) {
            this.inputs.get(idx)?.nativeElement?.focus();
            return;
          }
        }
      });
    });
  }

  onInput(index: number, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.wordsExerciceService.setFormValue(index, value);
  }

  @HostListener('keydown.Enter', ['$event'])
  @ignoreEventTarget('button')
  onEnter() {
    if (this.wordsExerciceService.isFormWin()) {
      this.wordsExerciceService.goToNextStep();
    } else {
      this.wordsExerciceService.goToPreviousStep();
    }
  }
}
