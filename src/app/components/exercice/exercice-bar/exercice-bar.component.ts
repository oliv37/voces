import { Component, input, output } from '@angular/core';
import { PatchQuestionIconComponent } from '@components/icon/patch-question-icon/patch-question-icon.component';
import { ArrowClockwiseIconComponent } from '@components/icon/arrow-clockwise-icon/arrow-clockwise-icon.component';
import { BtnDirective } from '@directives/btn.directive';
import { Level, LEVELS } from '@models/exercice.model';
import { StarFillIconComponent } from '../../icon/star-fill-icon/star-fill-icon.component';

@Component({
  selector: 'app-exercice-bar',
  templateUrl: './exercice-bar.component.html',
  imports: [
    BtnDirective,
    PatchQuestionIconComponent,
    ArrowClockwiseIconComponent,
    StarFillIconComponent,
  ],
})
export class ExerciceBarComponent {
  readonly levels = LEVELS;

  level = input.required<Level>();
  text = input<string>();
  levelChange = output<Level>();
  patchQuestion = output<void>();
  arrowClockwise = output<void>();
}
