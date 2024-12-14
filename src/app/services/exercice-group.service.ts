import {
  computed,
  effect,
  inject,
  Injectable,
  linkedSignal,
  Signal,
  untracked,
  WritableSignal,
} from '@angular/core';
import { GroupCompletionService } from './group-completion.service';
import { Word } from '@models/word.model';
import { Level } from '@models/exercice.model';
import { shuffle } from '@utils/array.util';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Group } from '@models/group.model';

@Injectable()
export class ExerciceGroupService {
  private _route = inject(ActivatedRoute);
  private _groupCompletionService = inject(GroupCompletionService);

  private _group: Signal<Group | undefined> = toSignal(
    this._route.data.pipe(map((data) => data['group'] as Group))
  );

  private _state: WritableSignal<State> = linkedSignal<State>(() => {
    const words: Word[] = this._group()?.words || [];
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

  _resetEffect = effect(() => {
    this._group();

    untracked(() => this.reset());
  });

  reset() {
    this._state.set({
      words: shuffle(this._group()?.words || []),
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
    const group = this._group();
    const word = this.word();
    const level = this.level();
    const wordsAnswered = this.state().wordsAnswered;

    if (!group || !word) {
      return;
    }

    const newWordsAnswered = new Set([...wordsAnswered, word.es]);
    const areAllWordsAnswered = this.areAllWordsAnswered(newWordsAnswered);

    this._state.update(({ words, wordIdx, level }) => ({
      words: areAllWordsAnswered ? shuffle(words) : words,
      wordIdx: (wordIdx + 1) % words.length,
      level,
      wordsAnswered: areAllWordsAnswered ? new Set() : newWordsAnswered,
    }));

    if (areAllWordsAnswered && level === 3) {
      this._groupCompletionService.markAsCompleted(group);
    }
  }

  previousLevel() {
    this._state.update(({ words, level, wordsAnswered }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level: level === 1 ? 3 : ((level - 1) as Level),
      wordsAnswered,
    }));
  }

  nextLevel() {
    this._state.update(({ words, level, wordsAnswered }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level: level === 3 ? 1 : ((level + 1) as Level),
      wordsAnswered,
    }));
  }

  setLevel(level: Level) {
    this._state.update(({ words, wordsAnswered }) => ({
      words: shuffle(words),
      wordIdx: 0,
      level,
      wordsAnswered,
    }));
  }

  private areAllWordsAnswered(wordsAnswered: Set<string>): boolean {
    return this.state().words.every((word) => wordsAnswered.has(word.es));
  }
}

interface State {
  words: Word[];
  wordIdx: number;
  level: Level;
  wordsAnswered: Set<string>;
}
