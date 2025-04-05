import {
  computed,
  inject,
  Injectable,
  linkedSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { GroupCompletionService } from '../../services/group-completion.service';
import { Word } from '@models/word.model';
import { Level, MAX_LEVEL } from '@models/exercice.model';
import { shuffle } from '@utils/array.util';
import { Group } from '@models/group.model';

@Injectable({ providedIn: 'root' })
export class ExerciceService {
  private _groupCompletionService = inject(GroupCompletionService);

  group = signal<Group | undefined>(undefined);

  private _state: WritableSignal<State> = linkedSignal<State>(() => {
    const words: Word[] = this.group()?.words || [];
    return {
      words: shuffle(words),
      wordIdx: 0,
      level: 1,
      wordsAnswered: new Set(),
    };
  });

  state = this._state.asReadonly();
  word = computed<Word | undefined>(
    () => this.state().words[this.state().wordIdx]
  );
  level = computed<Level>(() => this.state().level);
  wordIdx = computed<number>(() => this.state().wordIdx);
  nbWords = computed<number>(() => this.state().words.length);
  nbWordsAnswered = computed<number>(() => this.state().wordsAnswered.size);

  progressPercent = computed<number>(
    () => (this.nbWordsAnswered() * 100) / this.nbWords()
  );

  reset() {
    this._state.set({
      words: shuffle(this.group()?.words || []),
      wordIdx: 0,
      level: 1,
      wordsAnswered: new Set(),
    });
  }

  previousWord() {
    this._state.update(({ words, wordIdx, level, wordsAnswered }) => ({
      words,
      wordIdx: (wordIdx - 1 + words.length) % words.length,
      level,
      wordsAnswered,
    }));
  }

  nextWord() {
    this._state.update(({ words, wordIdx, level, wordsAnswered }) => ({
      words,
      wordIdx: (wordIdx + 1) % words.length,
      level,
      wordsAnswered,
    }));
  }

  answerWord() {
    const group = this.group();
    const word = this.word();
    const level = this.level();
    const wordsAnswered = this.state().wordsAnswered;

    if (!group || !word) {
      return;
    }

    const isMaxLevel = level === MAX_LEVEL;
    const newWordsAnswered = new Set([...wordsAnswered, word]);
    const wereAllWordsAnswered = this.areAllWordsAnswered(wordsAnswered);
    const areAllWordsAnswered = this.areAllWordsAnswered(newWordsAnswered);
    const mustMarkAsCompleted =
      isMaxLevel && !wereAllWordsAnswered && areAllWordsAnswered;

    this._state.update(({ words, wordIdx, level }) => ({
      words,
      wordIdx: (wordIdx + 1) % words.length,
      level,
      wordsAnswered: newWordsAnswered,
    }));

    if (mustMarkAsCompleted) {
      this._groupCompletionService.markAsCompleted(group);
    }
  }

  previousLevel() {
    this._state.update(({ words, level }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level: level === 1 ? MAX_LEVEL : ((level - 1) as Level),
      wordsAnswered: new Set(),
    }));
  }

  nextLevel() {
    this._state.update(({ words, level }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level: level === MAX_LEVEL ? 1 : ((level + 1) as Level),
      wordsAnswered: new Set(),
    }));
  }

  setLevel(level: Level) {
    this._state.update(({ words }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level,
      wordsAnswered: new Set(),
    }));
  }

  private areAllWordsAnswered(wordsAnswered: Set<Word>): boolean {
    return this.state().words.every((word) => wordsAnswered.has(word));
  }
}

interface State {
  words: Word[];
  wordIdx: number;
  level: Level;
  wordsAnswered: Set<Word>;
}
