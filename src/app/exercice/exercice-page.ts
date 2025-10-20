import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  untracked,
  viewChild,
} from '@angular/core';
import { ClientSide } from '@shared/components/client-side/client-side';
import type { OpenGraph } from '@shared/models/open-graph';
import { type WordGroup } from '@shared/models/word';
import type { Level } from './models/exercice';
import { Meta } from '@shared/directives/meta';
import { ExerciceState } from './services/exercice-state';
import { WordGroupCompletion } from '@shared/services/word-group-completion';
import { ExerciceLevel1 } from './components/exercice-level-1/exercice-level-1';
import { ExerciceLevel2 } from './components/exercice-level-2/exercice-level-2';
import { AbstractExerciceLevel } from './components/abstract-exercice-level';
import { ExerciceButtonBar } from './components/exercice-button-bar/exercice-button-bar';
import { ExerciceProgressBar } from './components/exercice-progress-bar/exercice-progress-bar';

@Component({
  imports: [
    ClientSide,
    Meta,
    ExerciceLevel1,
    ExerciceLevel2,
    ExerciceButtonBar,
    ExerciceProgressBar,
  ],
  templateUrl: './exercice-page.html',
})
export class ExercicePage implements OnDestroy {
  private _exerciceState = inject(ExerciceState);
  private _wordGroupCompletion = inject(WordGroupCompletion);

  exerciceLevelCmp = viewChild<AbstractExerciceLevel>('exerciceLevelCmp');

  wordGroups = input.required<WordGroup[]>();
  wordGroup = input.required<WordGroup>();

  level = this._exerciceState.level;
  wordIdx = this._exerciceState.wordIdx;
  word = this._exerciceState.word;
  nbWords = this._exerciceState.nbWords;
  progressPercent = this._exerciceState.progressPercent;
  isCompleted = this._exerciceState.isCompleted;
  hasUsedHelp = this._exerciceState.hasUsedHelp;

  isGroupCompleted = computed(() => {
    const group = this.wordGroup();
    return this._wordGroupCompletion.isCompleted(group);
  });

  prevWordGroupId = computed<number>(() => {
    const wordGroups = this.wordGroups();
    const idx = wordGroups.findIndex((g) => g.id === this.wordGroup().id);
    const prevIdx = (idx - 1 + wordGroups.length) % wordGroups.length;
    return wordGroups[prevIdx].id;
  });

  nextWordGroupId = computed<number>(() => {
    const wordGroups = this.wordGroups();
    const idx = wordGroups.findIndex((g) => g.id === this.wordGroup().id);
    const nextIdx = (idx + 1) % wordGroups.length;
    return wordGroups[nextIdx].id;
  });

  metaDescription = computed<string>(() => {
    const words = this.wordGroup().words;

    return (
      'Exercez-vous sur les mots de Vocabulaire Espagnol : ' +
      words.map((w) => w.es).join(' - ')
    );
  });

  metaOg = computed<OpenGraph>(() => {
    const id = this.wordGroup().id;
    const words = this.wordGroup().words;

    return {
      title: `Vocabulaire Espagnol ${id}`,
      description:
        'Excercice sur les mots de Vocabulaire Espagnol : ' +
        words.map((w) => w.es).join(' - '),
    };
  });

  _focusEffect = effect(() => {
    this._exerciceState.state();

    untracked(() => {
      this.exerciceLevelCmp()?.focus();
    });
  });

  _groupEffect = effect(() => {
    const group = this.wordGroup();

    this._exerciceState.group.set(group);
    this.scrollToTop();
  });

  ngOnDestroy() {
    this._exerciceState.group.set(undefined);
  }

  resetLevel() {
    this._exerciceState.resetLevel();
  }

  nextWord() {
    this._exerciceState.nextWord();
  }

  setLevel(level: Level) {
    this._exerciceState.setLevel(level);
  }

  help() {
    this.exerciceLevelCmp()?.help();
    this.exerciceLevelCmp()?.focus();
    this._exerciceState.setHasUsedHelp(true);
  }

  private scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
