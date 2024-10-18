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
import { ExerciceService } from '@services/exercice.service';
import { ExerciceButtonBarComponent } from '../exercice-button-bar/exercice-button-bar.component';
import { IgnoreTarget } from '@decorators/ignore-event-target.decorator';
import { BtnDirective } from '@directives/btn/btn.directive';

@Component({
  selector: 'app-exercice-step-form',
  standalone: true,
  templateUrl: './exercice-step-form.component.html',
  imports: [ExerciceButtonBarComponent, BtnDirective],
  host: {
    tabIndex: '-1',
    class: 'outline-none',
  },
})
export class ExerciceStepFormComponent {
  private _elementRef = inject(ElementRef);

  exerciceService = inject(ExerciceService);

  @ViewChildren('formInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor() {
    // [Effect] focus next input
    effect(() => {
      const nbFormValues = this.exerciceService.nbFormValues();
      const nbFormValuesValid = this.exerciceService.nbFormValuesValid();

      const areAllFormValuesValid = nbFormValuesValid >= nbFormValues;
      if (areAllFormValuesValid) {
        this._elementRef?.nativeElement?.focus();
        return;
      }

      untracked(() => {
        const lastFocusIndex = this.exerciceService.lastInputFocusIndex();
        for (let i = 0; i < nbFormValues; i++) {
          const idx = (lastFocusIndex + i) % nbFormValues;
          const isFormValueValid = this.exerciceService.isFormValueValid(idx);
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
    this.exerciceService.setFormValue(index, value);
  }

  @HostListener('keydown.Enter', ['$event'])
  @IgnoreTarget('button')
  onEnter() {
    if (this.exerciceService.areAllFormValuesValid()) {
      this.exerciceService.goToNextStep();
    } else {
      this.exerciceService.goToPreviousStep();
    }
  }
}
