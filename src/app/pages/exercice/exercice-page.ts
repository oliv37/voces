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
import { ClientSide } from '@components/client-side/client-side';
import type { OpenGraph } from '@models/open-graph';
import type { Level } from '@models/exercice';
import { Meta } from '@directives/meta';
import { Exercice } from '@services/exercice';
import { WordGroupCompletion } from '@services/word-group-completion';
import { ExerciceLevel1 } from '@components/exercice/exercice-level-1/exercice-level-1';
import { ExerciceLevel2 } from '@components/exercice/exercice-level-2/exercice-level-2';
import { AbstractExerciceLevel } from '@components/exercice/abstract-exercice-level';
import { ExerciceButtonBar } from '@components/exercice/exercice-button-bar/exercice-button-bar';
import { ExerciceProgressBar } from '@components/exercice/exercice-progress-bar/exercice-progress-bar';
import { WordGroup } from '@models/word';

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
  private _exercice = inject(Exercice);
  private _wordGroupCompletion = inject(WordGroupCompletion);

  exerciceLevelCmp = viewChild<AbstractExerciceLevel>('exerciceLevelCmp');

  wordGroups = input.required<WordGroup[]>();
  wordGroup = input.required<WordGroup>();

  level = this._exercice.level;
  wordIdx = this._exercice.wordIdx;
  word = this._exercice.word;
  nbWords = this._exercice.nbWords;
  progressPercent = this._exercice.progressPercent;
  isCompleted = this._exercice.isCompleted;
  hasUsedHelp = this._exercice.hasUsedHelp;

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
    this._exercice.state();

    untracked(() => {
      this.exerciceLevelCmp()?.focus();
    });
  });

  _groupEffect = effect(() => {
    const group = this.wordGroup();

    this._exercice.group.set(group);
    this.scrollToTop();
  });

  ngOnDestroy() {
    this._exercice.group.set(undefined);
  }

  resetLevel() {
    this._exercice.resetLevel();
  }

  answerWord() {
    this._exercice.answerWord();
  }

  setLevel(level: Level) {
    this._exercice.setLevel(level);
  }

  help() {
    this.exerciceLevelCmp()?.help();
    this.exerciceLevelCmp()?.focus();
    this._exercice.setHasUsedHelp(true);
  }

  private scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
