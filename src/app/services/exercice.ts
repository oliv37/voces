import {
  computed,
  inject,
  Injectable,
  linkedSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import type { Word } from '@models/word';
import { type Level, MAX_LEVEL } from '@models/exercice';
import type { Group } from '@models/group';
import { GroupCompletion } from '@services/group-completion';
import { shuffle } from '@utils/array';

@Injectable({ providedIn: 'root' })
export class Exercice {
  private _groupCompletion = inject(GroupCompletion);

  group = signal<Group | undefined>(undefined);

  private _state: WritableSignal<State> = linkedSignal<State>(() => {
    const words: Word[] = this.group()?.words || [];
    return {
      words: shuffle(words),
      wordIdx: 0,
      level: 1,
      isCompleted: false,
      hasUsedHelp: false,
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
  isMaxLevel = computed<boolean>(() => {
    return this.level() === MAX_LEVEL;
  });

  progressPercent = computed<number>(
    () => ((this.wordIdx() + 1) * 100) / this.nbWords()
  );

  reset() {
    this._state.set({
      words: shuffle(this.group()?.words || []),
      wordIdx: 0,
      level: 1,
      isCompleted: false,
      hasUsedHelp: false,
    });
  }

  resetLevel() {
    this._state.update(({ level }) => ({
      words: shuffle(this.group()?.words || []),
      wordIdx: 0,
      level,
      isCompleted: false,
      hasUsedHelp: false,
    }));
  }

  answerWord() {
    const group = this.group();
    const word = this.word();
    const isMaxLevel = this.isMaxLevel();
    const isLastWord = this.isLastWord();
    const hasNotUsedHelp = !this.hasUsedHelp();

    if (!group || !word) {
      return;
    }

    const hasAnsweredAllWordsOfMaxLevelWithoutHelp =
      hasNotUsedHelp && isMaxLevel && isLastWord;

    this._state.update(
      ({ words, wordIdx, level, hasUsedHelp, isCompleted }) => ({
        words: isLastWord ? shuffle(words) : words,
        wordIdx: isLastWord ? 0 : wordIdx + 1,
        level,
        isCompleted: isCompleted || hasAnsweredAllWordsOfMaxLevelWithoutHelp,
        hasUsedHelp: isLastWord ? false : hasUsedHelp,
      })
    );

    if (hasAnsweredAllWordsOfMaxLevelWithoutHelp) {
      this._groupCompletion.markAsCompleted(group);
    }
  }

  previousLevel() {
    this._state.update(({ words, level, isCompleted }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level: level === 1 ? MAX_LEVEL : ((level - 1) as Level),
      isCompleted,
      hasUsedHelp: false,
    }));
  }

  nextLevel() {
    this._state.update(({ words, level, isCompleted }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level: level === MAX_LEVEL ? 1 : ((level + 1) as Level),
      isCompleted,
      hasUsedHelp: false,
    }));
  }

  setLevel(level: Level) {
    this._state.update(({ words, isCompleted }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level,
      isCompleted,
      hasUsedHelp: false,
    }));
  }

  setHasUsedHelp(hasUsedHelp: boolean) {
    this._state.update((state) => ({
      ...state,
      hasUsedHelp,
    }));
  }
}

interface State {
  words: Word[];
  wordIdx: number;
  level: Level;
  isCompleted: boolean;
  hasUsedHelp: boolean;
}
