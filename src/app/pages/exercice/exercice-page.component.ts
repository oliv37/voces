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
import { Router } from '@angular/router';
import { ClientSideComponent } from '@components/client-side/client-side.component';
import { Group } from '@models/group.model';
import { Word } from '@models/word.model';
import { StarIconComponent } from '../../components/icon/star-icon/star-icon.component';
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { StarFillIconComponent } from '../../components/icon/star-fill-icon/star-fill-icon.component';
import { ExerciceLevel1Component } from '../../components/exercice/exercice-level-1/exercice-level-1.component';
import { ExerciceLevel2Component } from '../../components/exercice/exercice-level-2/exercice-level-2.component';
import { ExerciceLevel3Component } from '../../components/exercice/exercice-level-3/exercice-level-3.component';
import { ExerciceLevelComponent } from '@components/exercice/exercice-level.component';
import { Level, LEVELS } from '@models/exercice.model';
import { findNextGroup, findPreviousGroup } from '@utils/group.util';
import { ExerciceButtonBarComponent } from '../../components/exercice/exercice-button-bar/exercice-button-bar.component';

@Component({
  imports: [
    ClientSideComponent,
    StarIconComponent,
    SpacerComponent,
    StarFillIconComponent,
    ExerciceLevel1Component,
    ExerciceLevel2Component,
    ExerciceLevel3Component,
    ExerciceButtonBarComponent,
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

  words = computed(() => this.group().words);
  word = computed<Word>(() => this.words()[this.wordIdx()]);
  nbWords = computed<number>(() => this.words().length);
  progressPercent = computed<number>(
    () => (this.wordIdx() * 100) / this.nbWords()
  );

  exerciceLevelCmp = viewChild<ExerciceLevelComponent>('exerciceLevelCmp');

  resetExerciceEffect = effect(() => {
    this.group();
    untracked(() => this.resetExercice());
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

  previousWord() {
    const nbWords = this.nbWords();
    this.wordIdx.update((idx) => (idx - 1 + nbWords) % nbWords);
    this.exerciceLevelCmp()?.focusInput();
  }

  nextWord() {
    const nbWords = this.nbWords();
    this.wordIdx.update((idx) => (idx + 1) % nbWords);
    this.exerciceLevelCmp()?.focusInput();
  }

  previousLevel() {
    this.level.update((lvl) => (lvl === 1 ? 3 : ((lvl - 1) as Level)));
    this.wordIdx.set(0);
    this.exerciceLevelCmp()?.focusInput();
  }

  nextLevel() {
    this.level.update((lvl) => (lvl === 3 ? 1 : ((lvl + 1) as Level)));
    this.wordIdx.set(0);
    this.exerciceLevelCmp()?.focusInput();
  }

  goToPreviousExercice() {
    const previousGroup = findPreviousGroup(this.group());
    this.router.navigate([
      '/',
      previousGroup.category.pathParam,
      previousGroup.pathParam,
      'exercice',
    ]);
  }

  goToNextExercice() {
    const nextGroup = findNextGroup(this.group());
    this.router.navigate([
      '/',
      nextGroup.category.pathParam,
      nextGroup.pathParam,
      'exercice',
    ]);
  }
}
