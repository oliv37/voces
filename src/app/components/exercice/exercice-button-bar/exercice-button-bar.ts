import { Component, input, output } from '@angular/core';
import { type Level, LEVELS } from '@models/exercice';
import { Btn } from '@directives/btn';
import { PatchQuestionIcon } from '@components/icon/patch-question-icon/patch-question-icon';
import { ArrowClockwiseIcon } from '@components/icon/arrow-clockwise-icon/arrow-clockwise-icon';
import { StarFillIcon } from '@components/icon/star-fill-icon/star-fill-icon';

@Component({
  selector: 'app-exercice-button-bar',
  templateUrl: './exercice-button-bar.html',
  imports: [Btn, PatchQuestionIcon, ArrowClockwiseIcon, StarFillIcon],
})
export class ExerciceButtonBar {
  readonly levels = LEVELS;

  level = input.required<Level>();
  questionFillColor = input<string>('fill-neutral-900');
  starFillColor = input<string>('fill-gray-900');
  levelChange = output<Level>();
  patchQuestion = output<void>();
  arrowClockwise = output<void>();
}
