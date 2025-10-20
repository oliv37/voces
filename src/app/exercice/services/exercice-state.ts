import {
  computed,
  inject,
  Injectable,
  linkedSignal,
  signal,
} from '@angular/core';
import type { Word, WordGroup } from '@shared/models/word';
import { State, type Level, FINAL_LEVEL } from '../models/exercice';
import { WordGroupCompletion } from '@shared/services/word-group-completion';
import { shuffle } from '@shared/utils/array';

@Injectable({ providedIn: 'root' })
export class ExerciceState {
  private _wordGroupCompletion = inject(WordGroupCompletion);

  group = signal<WordGroup | undefined>(undefined);

  private _state = linkedSignal<State>(() => {
    const words: Word[] = this.group()?.words || [];
    return {
      words: shuffle(words),
      wordIdx: 0,
      level: 1,
      hasUsedHelp: false,
      isCompleted: false,
    };
  });

  state = this._state.asReadonly();
  word = computed<Word | undefined>(
    () => this.state().words[this.state().wordIdx]
  );
  level = computed<Level>(() => this.state().level);
  wordIdx = computed<number>(() => this.state().wordIdx);
  nbWords = computed<number>(() => this.state().words.length);
  isCompleted = computed<boolean>(() => this.state().isCompleted);
  hasUsedHelp = computed<boolean>(() => this.state().hasUsedHelp);
  isLastWord = computed<boolean>(() => {
    return this.nbWords() > 0 && this.wordIdx() + 1 === this.nbWords();
  });
  isFinalLevel = computed<boolean>(() => {
    return this.level() === FINAL_LEVEL;
  });

  progressPercent = computed<number>(
    () => ((this.wordIdx() + 1) * 100) / this.nbWords()
  );

  resetLevel({ isCompleted = false } = {}) {
    this._state.update(({ level }) => ({
      words: shuffle(this.group()?.words || []),
      wordIdx: 0,
      level,
      hasUsedHelp: false,
      isCompleted,
    }));
  }

  nextWord() {
    const group = this.group();
    const word = this.word();
    const hasNotUsedHelp = !this.hasUsedHelp();
    const isLastWord = this.isLastWord();
    const isFinalLevel = this.isFinalLevel();
    const isCompleted = this.isCompleted();

    if (!group || !word) {
      return;
    }

    if (isLastWord && isFinalLevel && hasNotUsedHelp) {
      this._wordGroupCompletion.markAsCompleted(group);
      this.resetLevel({ isCompleted: true });
      return;
    }

    if (isLastWord) {
      this.resetLevel({ isCompleted });
      return;
    }

    this._state.update((prevState) => ({
      ...prevState,
      wordIdx: prevState.wordIdx + 1,
    }));
  }

  previousLevel() {
    this._state.update(({ words, level, isCompleted }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level: level === 1 ? FINAL_LEVEL : ((level - 1) as Level),
      hasUsedHelp: false,
      isCompleted,
    }));
  }

  nextLevel() {
    this._state.update(({ words, level, isCompleted }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level: level === FINAL_LEVEL ? 1 : ((level + 1) as Level),
      hasUsedHelp: false,
      isCompleted,
    }));
  }

  setLevel(level: Level) {
    this._state.update(({ words, isCompleted }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level,
      hasUsedHelp: false,
      isCompleted,
    }));
  }

  setHasUsedHelp(hasUsedHelp: boolean) {
    this._state.update((state) => ({
      ...state,
      hasUsedHelp,
    }));
  }
}
