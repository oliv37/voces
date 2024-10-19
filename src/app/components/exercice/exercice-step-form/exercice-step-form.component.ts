import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  inject,
  HostListener,
  effect,
  untracked,
  ViewChild,
} from '@angular/core';
import { ExerciceService } from '@services/exercice.service';
import { IgnoreTarget } from '@decorators/ignore-event-target.decorator';
import { BtnDirective } from '@directives/btn/btn.directive';
import { SpacerComponent } from '../../spacer/spacer.component';
import { CheckSvgComponent } from '../../svg/check-svg/check-svg.component';

@Component({
  selector: 'app-exercice-step-form',
  standalone: true,
  templateUrl: './exercice-step-form.component.html',
  imports: [BtnDirective, SpacerComponent, CheckSvgComponent],
  host: {
    tabIndex: '-1',
    class: 'outline-none',
  },
})
export class ExerciceStepFormComponent {
  @ViewChild('btn', { static: false, read: ElementRef })
  private _btn!: ElementRef;

  exerciceService = inject(ExerciceService);

  @ViewChildren('formInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor() {
    // [Effect] focus next element
    effect(() => {
      const nbFormValues = this.exerciceService.nbFormValues();
      const nbFormValuesValid = this.exerciceService.nbFormValuesValid();

      untracked(() => {
        const areAllFormValuesValid = nbFormValuesValid >= nbFormValues;
        if (areAllFormValuesValid) {
          console.log(this._btn);
          this._btn?.nativeElement?.focus();
          return;
        }

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
