import { Component, input, output } from '@angular/core';
import { type Level, LEVELS } from '@models/exercice';
import { PatchQuestionIconComponent } from '@components/icon/patch-question-icon/patch-question-icon.component';
import { ArrowClockwiseIconComponent } from '@components/icon/arrow-clockwise-icon/arrow-clockwise-icon.component';
import { StarFillIconComponent } from '@components/icon/star-fill-icon/star-fill-icon.component';
import { Btn } from '@directives/btn';

@Component({
  selector: 'app-exercice-button-bar',
  templateUrl: './exercice-button-bar.component.html',
  imports: [
    Btn,
    PatchQuestionIconComponent,
    ArrowClockwiseIconComponent,
    StarFillIconComponent,
  ],
})
export class ExerciceButtonBarComponent {
  readonly levels = LEVELS;

  level = input.required<Level>();
  questionFillColor = input<string>('fill-neutral-900');
  starFillColor = input<string>('fill-gray-900');
  levelChange = output<Level>();
  patchQuestion = output<void>();
  arrowClockwise = output<void>();
}
