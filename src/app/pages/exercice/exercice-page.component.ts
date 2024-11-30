import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { ClientSideComponent } from '@components/client-side/client-side.component';
import { Group } from '@models/group.model';
import { Word } from '@models/word.model';
import { StarIconComponent } from '../../components/icon/star-icon/star-icon.component';
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { StarFillIconComponent } from '../../components/icon/star-fill-icon/star-fill-icon.component';
import { ExerciceLevel1Component } from '../../components/exercice/exercice-level-1/exercice-level-1.component';
import { ExerciceLevel2Component } from '../../components/exercice/exercice-level-2/exercice-level-2.component';
import { ExerciceLevel3Component } from '../../components/exercice/exercice-level-3/exercice-level-3.component';
import { BtnDirective } from '@directives/btn/btn.directive';
import { ArrowClockwiseIconComponent } from '../../components/icon/arrow-clockwise-icon/arrow-clockwise-icon.component';
import { ArrowRightIconComponent } from '../../components/icon/arrow-right-icon/arrow-right-icon.component';
import { PatchQuestionIconComponent } from '../../components/icon/patch-question-icon/patch-question-icon.component';
import { ExerciceLevelComponent } from '@components/exercice/exercice-level.component';
import { Level, LEVELS } from '@models/exercice.model';
import { findNextGroup } from '@utils/group.util';
import { Router } from '@angular/router';
import { ArrowRepeatIconComponent } from '../../components/icon/arrow-repeat-icon/arrow-repeat-icon.component';
import { ArrowLeftIconComponent } from '../../components/icon/arrow-left-icon/arrow-left-icon.component';

@Component({
  imports: [
    ClientSideComponent,
    StarIconComponent,
    SpacerComponent,
    StarFillIconComponent,
    ExerciceLevel1Component,
    ExerciceLevel2Component,
    ExerciceLevel3Component,
    BtnDirective,
    ArrowClockwiseIconComponent,
    ArrowRightIconComponent,
    PatchQuestionIconComponent,
    ArrowRepeatIconComponent,
    ArrowLeftIconComponent,
  ],
  templateUrl: './exercice-page.component.html',
})
export class ExercicePageComponent {
  readonly levels = LEVELS;

  el = inject(ElementRef);
  router = inject(Router);

  group = input.required<Group>();

  level = signal<Level>(1);
  wordIdx = signal<number>(0);
  word = computed<Word>(() => this.group().words[this.wordIdx()]);

  exerciceLevelCmp = viewChild<ExerciceLevelComponent>('exerciceLevelCmp');

  resetExerciceEffect = effect(() => {
    this.group();
    untracked(() => this.resetExercice());
  });

  resetLevelEffect = effect(() => {
    this.level();
    untracked(() => this.resetLevel());
  });

  resetExercice() {
    this.wordIdx.set(0);
    this.level.set(1);
    this.exerciceLevelCmp()?.focusInput();
  }

  resetLevel() {
    this.wordIdx.set(0);
    this.exerciceLevelCmp()?.focusInput();
  }

  help() {
    this.exerciceLevelCmp()?.help();
    this.exerciceLevelCmp()?.focusInput();
  }

  nextWord() {
    const nbWords = this.group().words.length;
    const lastLevel = this.levels[this.levels.length - 1];
    const isLastWord = this.wordIdx() >= nbWords - 1;
    const isLastLevel = this.level() === lastLevel;

    if (isLastWord && isLastLevel) {
      this.goToNextExercice();
      return;
    }

    if (isLastWord) {
      this.level.update((lvl) => (lvl + 1) as Level);
      return;
    }

    this.wordIdx.update((idx) => idx + 1);
  }

  previousLevel() {
    const lastLevel = this.levels[this.levels.length - 1];
    this.level.update((lvl) => (lvl !== 1 ? ((lvl - 1) as Level) : lastLevel));
  }

  nextLevel() {
    const lastLevel = this.levels[this.levels.length - 1];
    this.level.update((lvl) => (lvl !== lastLevel ? ((lvl + 1) as Level) : 1));
  }

  private goToNextExercice() {
    const nextGroup = findNextGroup(this.group());
    this.router.navigate([
      '/',
      nextGroup.category.pathParam,
      nextGroup.pathParam,
      'exercice',
    ]);
  }
}
