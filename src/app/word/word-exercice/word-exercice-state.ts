import {
  computed,
  inject,
  Injectable,
  linkedSignal,
  signal,
} from '@angular/core';
import type { Word, WordGroup } from '../word.model';
import { State, type Level, FINAL_LEVEL } from './word-exercice.model';
import { WordGroupCompletion } from '../word-group-completion';
import { shuffle } from '@shared/misc/array';

@Injectable({ providedIn: 'root' })
export class WordExerciceState {
  readonly #wordGroupCompletion = inject(WordGroupCompletion);

  readonly #wordGroup = signal<WordGroup | undefined>(undefined);

  readonly #state = linkedSignal<State>(() => {
    const words: Word[] = this.#wordGroup()?.words || [];
    return {
      words: shuffle(words),
      wordIdx: 0,
      level: 1,
      hasUsedHelp: false,
      isCompleted: false,
    };
  });

  readonly state = this.#state.asReadonly();
  readonly word = computed<Word | undefined>(
    () => this.state().words[this.state().wordIdx]
  );
  readonly level = computed<Level>(() => this.state().level);
  readonly wordIdx = computed<number>(() => this.state().wordIdx);
  readonly nbWords = computed<number>(() => this.state().words.length);
  readonly isCompleted = computed<boolean>(() => this.state().isCompleted);
  readonly hasUsedHelp = computed<boolean>(() => this.state().hasUsedHelp);
  readonly isLastWord = computed<boolean>(() => {
    return this.nbWords() > 0 && this.wordIdx() + 1 === this.nbWords();
  });
  readonly isFinalLevel = computed<boolean>(() => {
    return this.level() === FINAL_LEVEL;
  });

  readonly progressPercent = computed<number>(
    () => ((this.wordIdx() + 1) * 100) / this.nbWords()
  );

  init(wordGroup: WordGroup) {
    this.#wordGroup.set(wordGroup);
  }

  destroy() {
    this.#wordGroup.set(undefined);
  }

  resetLevel({ isCompleted = false } = {}) {
    this.#state.update(({ level }) => ({
      words: shuffle(this.#wordGroup()?.words || []),
      wordIdx: 0,
      level,
      hasUsedHelp: false,
      isCompleted,
    }));
  }

  nextWord() {
    const wordGroup = this.#wordGroup();
    const word = this.word();
    const hasNotUsedHelp = !this.hasUsedHelp();
    const isLastWord = this.isLastWord();
    const isFinalLevel = this.isFinalLevel();
    const isCompleted = this.isCompleted();

    if (!wordGroup || !word) {
      return;
    }

    if (isLastWord && isFinalLevel && hasNotUsedHelp) {
      this.#wordGroupCompletion.markAsCompleted(wordGroup);
      this.resetLevel({ isCompleted: true });
      return;
    }

    if (isLastWord) {
      this.resetLevel({ isCompleted });
      return;
    }

    this.#state.update((prevState) => ({
      ...prevState,
      wordIdx: prevState.wordIdx + 1,
    }));
  }

  previousLevel() {
    this.#state.update(({ words, level, isCompleted }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level: level === 1 ? FINAL_LEVEL : ((level - 1) as Level),
      hasUsedHelp: false,
      isCompleted,
    }));
  }

  nextLevel() {
    this.#state.update(({ words, level, isCompleted }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level: level === FINAL_LEVEL ? 1 : ((level + 1) as Level),
      hasUsedHelp: false,
      isCompleted,
    }));
  }

  setLevel(level: Level) {
    this.#state.update(({ words, isCompleted }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level,
      hasUsedHelp: false,
      isCompleted,
    }));
  }

  setHasUsedHelp(hasUsedHelp: boolean) {
    this.#state.update((state) => ({
      ...state,
      hasUsedHelp,
    }));
  }
}
