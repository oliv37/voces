import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  Signal,
  untracked,
  viewChild,
} from '@angular/core';
import type { OpenGraph } from '@shared/seo/open-graph.model';
import type { WordGroup, Word } from '../../word.model';
import type { Level } from '../word-exercice.model';
import { Meta } from '@shared/seo/meta';
import { WordExerciceState } from '../word-exercice-state';
import { WordGroupCompletion } from '../../word-group-completion';
import { WordExerciceLevel1 } from '../word-exercice-level-1/word-exercice-level-1';
import { WordExerciceLevel2 } from '../word-exercice-level-2/word-exercice-level-2';
import { WordExerciceLevel3 } from '../word-exercice-level-3/word-exercice-level-3';
import { AbstractWordExerciceLevel } from '../abstract-word-exercice-level';
import { WordExerciceButtonBar } from '../word-exercice-button-bar/word-exercice-button-bar';
import { WordExerciceProgressBar } from '../word-exercice-progress-bar/word-exercice-progress-bar';
import { TopBar } from '@shared/bar/top-bar/top-bar';
import { VisibleOnClient } from '@shared/client/visible-on-client';

@Component({
  imports: [
    Meta,
    WordExerciceLevel1,
    WordExerciceLevel2,
    WordExerciceLevel3,
    WordExerciceButtonBar,
    WordExerciceProgressBar,
    TopBar,
    VisibleOnClient,
  ],
  templateUrl: './word-exercice-page.html',
})
export class WordExercicePage implements OnDestroy {
  readonly #wordExerciceState = inject(WordExerciceState);
  readonly #wordGroupCompletion = inject(WordGroupCompletion);

  protected readonly exerciceLevelCmp =
    viewChild<AbstractWordExerciceLevel>('exerciceLevelCmp');

  readonly wordGroup = input.required<WordGroup>();
  readonly wordGroups = input.required<WordGroup[]>();

  protected readonly word: Signal<Word | undefined> =
    this.#wordExerciceState.word;
  protected readonly words: Signal<Word[]> = this.#wordExerciceState.words;
  protected readonly level: Signal<Level> = this.#wordExerciceState.level;
  protected readonly wordIdx: Signal<number> = this.#wordExerciceState.wordIdx;
  protected readonly nbWords: Signal<number> = this.#wordExerciceState.nbWords;
  protected readonly progressPercent: Signal<number> =
    this.#wordExerciceState.progressPercent;
  protected readonly isCompleted: Signal<boolean> =
    this.#wordExerciceState.isCompleted;
  protected readonly hasUsedHelp: Signal<boolean> =
    this.#wordExerciceState.hasUsedHelp;

  protected readonly isWordGroupCompleted = computed(() => {
    const wordGroup = this.wordGroup();
    return this.#wordGroupCompletion.isCompleted(wordGroup);
  });

  protected readonly prevWordGroupId = computed<number>(() => {
    const wordGroups = this.wordGroups();
    const idx = wordGroups.findIndex((g) => g.id === this.wordGroup().id);
    const prevIdx = (idx - 1 + wordGroups.length) % wordGroups.length;
    return wordGroups[prevIdx].id;
  });

  protected readonly nextWordGroupId = computed<number>(() => {
    const wordGroups = this.wordGroups();
    const idx = wordGroups.findIndex((g) => g.id === this.wordGroup().id);
    const nextIdx = (idx + 1) % wordGroups.length;
    return wordGroups[nextIdx].id;
  });

  protected readonly metaDescription = computed<string>(() => {
    const words = this.wordGroup().words;

    return (
      'Exercez-vous sur les mots de Vocabulaire Espagnol : ' +
      words.map((w) => w.es).join(' - ')
    );
  });

  protected readonly metaOg = computed<OpenGraph>(() => {
    const id = this.wordGroup().id;
    const words = this.wordGroup().words;

    return {
      title: `Vocabulaire Espagnol ${id}`,
      description:
        'Excercice sur les mots de Vocabulaire Espagnol : ' +
        words.map((w) => w.es).join(' - '),
    };
  });

  protected readonly focusEffect = effect(() => {
    this.#wordExerciceState.state();

    untracked(() => {
      this.exerciceLevelCmp()?.focus();
    });
  });

  protected readonly wordGroupEffect = effect(() => {
    const wordGroup = this.wordGroup();

    this.#wordExerciceState.init(wordGroup);
    this.#scrollToTop();
  });

  ngOnDestroy() {
    this.#wordExerciceState.destroy();
  }

  protected resetLevel() {
    this.#wordExerciceState.resetLevel();
  }

  protected nextWord() {
    this.#wordExerciceState.nextWord();
  }

  protected setLevel(level: Level) {
    this.#wordExerciceState.setLevel(level);
  }

  protected help() {
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
