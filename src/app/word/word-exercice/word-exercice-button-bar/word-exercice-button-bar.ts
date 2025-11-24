import { Component, input, output } from '@angular/core';
import { type Level, LEVELS } from '../word-exercice.model';
import { RouterLink } from '@angular/router';
import { PatchQuestionIcon } from '@shared/icon/patch-question-icon/patch-question-icon';
import { ArrowClockwiseIcon } from '@shared/icon/arrow-clockwise-icon/arrow-clockwise-icon';
import { StarFillIcon } from '@shared/icon/star-fill-icon/star-fill-icon';
import { ArrowUpShortIcon } from '@shared/icon/arrow-up-short-icon/arrow-up-short-icon';
import { ArrowDownShortIcon } from '@shared/icon/arrow-down-short-icon/arrow-down-short-icon';

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
  protected readonly levels = LEVELS;

  readonly level = input.required<Level>();
  readonly currentWordGroupId = input.required<number>();
  readonly prevWordGroupId = input.required<number>();
  readonly nextWordGroupId = input.required<number>();
  readonly questionFillColor = input<string>('fill-neutral-900');
  readonly starFillColor = input<string>('fill-gray-900');

  readonly levelChange = output<Level>();
  readonly patchQuestion = output<void>();
  readonly arrowClockwise = output<void>();
}
