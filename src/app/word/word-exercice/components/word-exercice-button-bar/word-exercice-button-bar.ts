import { Component, input, output } from '@angular/core';
import { type Level, LEVELS } from '../../models/word-exercice';
import { RouterLink } from '@angular/router';
import { PatchQuestionIcon } from '@shared/components/icon/patch-question-icon/patch-question-icon';
import { ArrowClockwiseIcon } from '@shared/components/icon/arrow-clockwise-icon/arrow-clockwise-icon';
import { StarFillIcon } from '@shared/components/icon/star-fill-icon/star-fill-icon';
import { ArrowUpShortIcon } from '@shared/components/icon/arrow-up-short-icon/arrow-up-short-icon';
import { ArrowDownShortIcon } from '@shared/components/icon/arrow-down-short-icon/arrow-down-short-icon';

@Component({
  selector: 'app-word-exercice-button-bar',
  templateUrl: './word-exercice-button-bar.html',
  imports: [
    PatchQuestionIcon,
    ArrowClockwiseIcon,
    StarFillIcon,
    RouterLink,
    ArrowUpShortIcon,
    ArrowDownShortIcon,
  ],
})
export class WordExerciceButtonBar {
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
