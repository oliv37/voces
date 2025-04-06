import { Component, input, output } from '@angular/core';
import { Level, LEVELS } from '@models/exercice.model';
import { PatchQuestionIconComponent } from '@components/icon/patch-question-icon/patch-question-icon.component';
import { ArrowClockwiseIconComponent } from '@components/icon/arrow-clockwise-icon/arrow-clockwise-icon.component';
import { StarFillIconComponent } from '@components/icon/star-fill-icon/star-fill-icon.component';
import { BtnDirective } from '@directives/btn.directive';

@Component({
  selector: 'app-exercice-button-bar',
  templateUrl: './exercice-button-bar.component.html',
  imports: [
    BtnDirective,
    PatchQuestionIconComponent,
    ArrowClockwiseIconComponent,
    StarFillIconComponent,
  ],
})
export class ExerciceButtonBarComponent {
  readonly levels = LEVELS;

  level = input.required<Level>();
  levelChange = output<Level>();
  patchQuestion = output<void>();
  arrowClockwise = output<void>();
}
