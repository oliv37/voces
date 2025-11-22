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
import { ClientSide } from '@shared/client/client-side/client-side';
import type { OpenGraph } from '@shared/seo/open-graph.model';
import { type WordGroup } from '../../word.model';
import type { Level } from '../word-exercice.model';
import { Meta } from '@shared/seo/meta';
import { WordExerciceState } from '../word-exercice-state';
import { WordGroupCompletion } from '../../word-group-completion';
import { WordExerciceLevel1 } from '../word-exercice-level-1/word-exercice-level-1';
import { WordExerciceLevel2 } from '../word-exercice-level-2/word-exercice-level-2';
import { AbstractWordExerciceLevel } from '../abstract-word-exercice-level';
import { WordExerciceButtonBar } from '../word-exercice-button-bar/word-exercice-button-bar';
import { WordExerciceProgressBar } from '../word-exercice-progress-bar/word-exercice-progress-bar';
import { TopBar } from '@shared/bar/top-bar/top-bar';

@Component({
  imports: [
    ClientSide,
    Meta,
    WordExerciceLevel1,
    WordExerciceLevel2,
    WordExerciceButtonBar,
    WordExerciceProgressBar,
    TopBar,
  ],
  templateUrl: './word-exercice-page.html',
})
export class WordExercicePage implements OnDestroy {
  #wordExerciceState = inject(WordExerciceState);
  #wordGroupCompletion = inject(WordGroupCompletion);

  exerciceLevelCmp = viewChild<AbstractWordExerciceLevel>('exerciceLevelCmp');

  wordGroup = input.required<WordGroup>();
  wordGroups = input.required<WordGroup[]>();

  level = this.#wordExerciceState.level;
  wordIdx = this.#wordExerciceState.wordIdx;
  word = this.#wordExerciceState.word;
  nbWords = this.#wordExerciceState.nbWords;
  progressPercent = this.#wordExerciceState.progressPercent;
  isCompleted = this.#wordExerciceState.isCompleted;
  hasUsedHelp = this.#wordExerciceState.hasUsedHelp;

  isWordGroupCompleted = computed(() => {
    const wordGroup = this.wordGroup();
    return this.#wordGroupCompletion.isCompleted(wordGroup);
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

  focusEffect = effect(() => {
    this.#wordExerciceState.state();

    untracked(() => {
      this.exerciceLevelCmp()?.focus();
    });
  });

  wordGroupEffect = effect(() => {
    const wordGroup = this.wordGroup();

    this.#wordExerciceState.group.set(wordGroup);
    this.#scrollToTop();
  });

  ngOnDestroy() {
    this.#wordExerciceState.group.set(undefined);
  }

  resetLevel() {
    this.#wordExerciceState.resetLevel();
  }

  nextWord() {
    this.#wordExerciceState.nextWord();
  }

  setLevel(level: Level) {
    this.#wordExerciceState.setLevel(level);
  }

  help() {
    this.exerciceLevelCmp()?.help();
    this.exerciceLevelCmp()?.focus();
    this.#wordExerciceState.setHasUsedHelp(true);
  }

  #scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
