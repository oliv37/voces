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
import { type WordGroup } from '../models/word';
import type { Level } from './models/word-exercice';
import { Meta } from '@shared/directives/meta';
import { WordExerciceState } from './services/word-exercice-state';
import { WordGroupCompletion } from '../services/word-group-completion';
import { WordExerciceLevel1 } from './components/word-exercice-level-1/word-exercice-level-1';
import { WordExerciceLevel2 } from './components/word-exercice-level-2/word-exercice-level-2';
import { AbstractWordExerciceLevel } from './components/abstract-word-exercice-level';
import { WordExerciceButtonBar } from './components/word-exercice-button-bar/word-exercice-button-bar';
import { WordExerciceProgressBar } from './components/word-exercice-progress-bar/word-exercice-progress-bar';

@Component({
  imports: [
    ClientSide,
    Meta,
    WordExerciceLevel1,
    WordExerciceLevel2,
    WordExerciceButtonBar,
    WordExerciceProgressBar,
  ],
  templateUrl: './word-exercice-page.html',
})
export class WordExercicePage implements OnDestroy {
  private _wordExerciceState = inject(WordExerciceState);
  private _wordGroupCompletion = inject(WordGroupCompletion);

  exerciceLevelCmp = viewChild<AbstractWordExerciceLevel>('exerciceLevelCmp');

  wordGroups = input.required<WordGroup[]>();
  wordGroup = input.required<WordGroup>();

  level = this._wordExerciceState.level;
  wordIdx = this._wordExerciceState.wordIdx;
  word = this._wordExerciceState.word;
  nbWords = this._wordExerciceState.nbWords;
  progressPercent = this._wordExerciceState.progressPercent;
  isCompleted = this._wordExerciceState.isCompleted;
  hasUsedHelp = this._wordExerciceState.hasUsedHelp;

  isWordGroupCompleted = computed(() => {
    const wordGroup = this.wordGroup();
    return this._wordGroupCompletion.isCompleted(wordGroup);
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
    this._wordExerciceState.state();

    untracked(() => {
      this.exerciceLevelCmp()?.focus();
    });
  });

  _groupEffect = effect(() => {
    const group = this.wordGroup();

    this._wordExerciceState.group.set(group);
    this.scrollToTop();
  });

  ngOnDestroy() {
    this._wordExerciceState.group.set(undefined);
  }

  resetLevel() {
    this._wordExerciceState.resetLevel();
  }

  nextWord() {
    this._wordExerciceState.nextWord();
  }

  setLevel(level: Level) {
    this._wordExerciceState.setLevel(level);
  }

  help() {
    this.exerciceLevelCmp()?.help();
    this.exerciceLevelCmp()?.focus();
    this._wordExerciceState.setHasUsedHelp(true);
  }

  private scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
