import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
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
import { State, Level, LEVELS } from '@models/exercice.model';
import { findNextGroup, findPreviousGroup } from '@utils/group.util';
import { ExerciceButtonBarComponent } from '../../components/exercice/exercice-button-bar/exercice-button-bar.component';
import { shuffle } from '@utils/array.util';
import { GroupCompletionService } from '@services/group-completion.service';

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
  groupCompletionService = inject(GroupCompletionService);

  group = input.required<Group>();

  state = linkedSignal<State>(() => ({
    words: shuffle(this.group().words),
    wordIdx: 0,
    level: 1,
    wordsAnswered: new Set(),
  }));

  word = computed<Word>(() => this.state().words[this.state().wordIdx]);
  nbWords = computed<number>(() => this.state().words.length);
  progressPercent = computed<number>(
    () => (this.state().wordIdx * 100) / this.nbWords()
  );

  exerciceLevelCmp = viewChild<ExerciceLevelComponent>('exerciceLevelCmp');

  resetEffect = effect(() => {
    this.group();

    untracked(() => this.reset());
  });

  focusEffect = effect(() => {
    this.state();

    this.exerciceLevelCmp()?.focus();
  });

  reset() {
    this.state.set({
      words: shuffle(this.group().words),
      wordIdx: 0,
      level: 1,
      wordsAnswered: new Set(),
    });
  }

  resetLevel() {
    this.state.update(({ level }) => ({
      words: shuffle(this.group().words),
      wordIdx: 0,
      level,
      wordsAnswered: new Set(),
    }));
  }

  help() {
    this.exerciceLevelCmp()?.help();
    this.exerciceLevelCmp()?.focus();
  }

  previousWord() {
    this.state.update(({ words, wordIdx, level, wordsAnswered }) => ({
      words,
      wordIdx: (wordIdx - 1 + words.length) % words.length,
      level,
      wordsAnswered,
    }));
  }

  nextWord() {
    this.state.update(({ words, wordIdx, level, wordsAnswered }) => ({
      words: wordIdx == words.length - 1 ? shuffle(words) : words,
      wordIdx: (wordIdx + 1) % words.length,
      level,
      wordsAnswered,
    }));
  }

  answerWord() {
    const newWordsAnswered = new Set([
      ...this.state().wordsAnswered,
      this.word().es,
    ]);
    const allWordsAnswered = this.areAllWordsAnswered(newWordsAnswered);

    if (allWordsAnswered) {
      this.groupCompletionService.markAsCompleted(this.group());
    }

    this.state.update(({ words, wordIdx, level }) => ({
      words: wordIdx == words.length - 1 ? shuffle(words) : words,
      wordIdx: (wordIdx + 1) % words.length,
      level,
      wordsAnswered: allWordsAnswered ? new Set() : newWordsAnswered,
    }));
  }

  previousLevel() {
    this.state.update(({ words, level, wordsAnswered }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level: level === 1 ? 3 : ((level - 1) as Level),
      wordsAnswered,
    }));
  }

  nextLevel() {
    this.state.update(({ words, level, wordsAnswered }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level: level === 3 ? 1 : ((level + 1) as Level),
      wordsAnswered,
    }));
  }

  setLevel(level: Level) {
    this.state.update(({ words, wordsAnswered }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level,
      wordsAnswered,
    }));
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

  private areAllWordsAnswered(wordsAnswered: Set<string>): boolean {
    return this.state().words.every((word) => wordsAnswered.has(word.es));
  }
}
