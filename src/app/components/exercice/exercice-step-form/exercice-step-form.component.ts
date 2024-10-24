import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  inject,
  HostListener,
  effect,
  computed,
} from '@angular/core';
import { ExerciceService } from '@services/exercice.service';
import { IgnoreTarget } from '@decorators/ignore-event-target.decorator';
import { BtnDirective } from '@directives/btn/btn.directive';
import { SpacerComponent } from '@components/spacer/spacer.component';
import { CheckIconComponent } from '@components/icon/check-icon/check-icon.component';
import { ArrowLeftIconComponent } from '../../icon/arrow-left-icon/arrow-left-icon.component';

@Component({
  selector: 'app-exercice-step-form',
  standalone: true,
  templateUrl: './exercice-step-form.component.html',
  imports: [
    BtnDirective,
    SpacerComponent,
    CheckIconComponent,
    ArrowLeftIconComponent,
  ],
})
export class ExerciceStepFormComponent {
  private _inputIndexToFocus = computed<number | undefined>(() => {
    const nbFormValues = this.exerciceService.nbFormValues();
    const lastFocusIndex = this.exerciceService.lastInputFocusIndex();

    for (let i = 0; i < nbFormValues; i++) {
      const idx = (lastFocusIndex + i) % nbFormValues;
      if (!this.exerciceService.isFormValueValid(idx)) {
        return idx;
      }
    }

    return undefined;
  });

  exerciceService = inject(ExerciceService);

  @ViewChildren('formInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor() {
    // [Effect] focus next input
    effect(() => {
      const inputIndexToFocus = this._inputIndexToFocus();
      if (typeof inputIndexToFocus == 'number') {
        this.inputs.get(inputIndexToFocus)?.nativeElement?.focus();
      }
    });
  }

  onInput(index: number, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.exerciceService.setFormValue(index, value);
  }

  @HostListener('window:keydown.enter', ['$event'])
  @IgnoreTarget('button', 'a')
  onEnter() {
    if (this.exerciceService.areAllFormValuesValid()) {
      this.exerciceService.goToNextStep();
    } else {
      this.exerciceService.goToPreviousStep();
    }
  }
}
