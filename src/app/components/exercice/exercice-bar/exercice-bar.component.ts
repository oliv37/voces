import {
  booleanAttribute,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { ArrowLeftIconComponent } from '../../icon/arrow-left-icon/arrow-left-icon.component';
import { PatchQuestionIconComponent } from '../../icon/patch-question-icon/patch-question-icon.component';
import { ArrowClockwiseIconComponent } from '../../icon/arrow-clockwise-icon/arrow-clockwise-icon.component';
import { ArrowRightIconComponent } from '../../icon/arrow-right-icon/arrow-right-icon.component';
import { BtnDirective } from '@directives/btn.directive';
import { ExerciceLevelPickerComponent } from '../exercice-level-picker/exercice-level-picker.component';
import { Level } from '@models/exercice.model';

@Component({
  selector: 'app-exercice-bar',
  templateUrl: './exercice-bar.component.html',
  imports: [
    BtnDirective,
    ArrowLeftIconComponent,
    PatchQuestionIconComponent,
    ArrowClockwiseIconComponent,
    ArrowRightIconComponent,
    ExerciceLevelPickerComponent,
  ],
})
export class ExerciceBarComponent {
  showArrow = input(true, { transform: booleanAttribute });
  level = model.required<Level>();
  infoText = input<string>();
  arrowLeft = output();
  patchQuestion = output();
  arrowClockwise = output();
  arrowRight = output();
}
