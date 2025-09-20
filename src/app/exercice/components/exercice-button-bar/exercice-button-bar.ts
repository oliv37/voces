import { Component, input, output } from '@angular/core';
import { type Level, LEVELS } from '../../models/exercice';
import { RouterLink } from '@angular/router';
import { PatchQuestionIcon } from '@shared/components/icon/patch-question-icon/patch-question-icon';
import { ArrowClockwiseIcon } from '@shared/components/icon/arrow-clockwise-icon/arrow-clockwise-icon';
import { StarFillIcon } from '@shared/components/icon/star-fill-icon/star-fill-icon';
import { ArrowLeftIcon } from '@shared/components/icon/arrow-left-icon/arrow-right-icon';
import { ArrowRightIcon } from '@shared/components/icon/arrow-right-icon/arrow-right-icon';

@Component({
  selector: 'app-exercice-button-bar',
  templateUrl: './exercice-button-bar.html',
  imports: [
    PatchQuestionIcon,
    ArrowClockwiseIcon,
    StarFillIcon,
    RouterLink,
    ArrowLeftIcon,
    ArrowRightIcon,
  ],
})
export class ExerciceButtonBar {
  readonly levels = LEVELS;

  level = input.required<Level>();
  currentWordGroupId = input.required<number>();
  prevWordGroupId = input.required<number>();
  nextWordGroupId = input.required<number>();
  questionFillColor = input<string>('fill-neutral-900');
  starFillColor = input<string>('fill-gray-900');

  levelChange = output<Level>();
  patchQuestion = output<void>();
  arrowClockwise = output<void>();
}
