import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Level } from '@models/exercice.model';
import { Word } from '@models/word.model';
import { shuffle } from '@utils/array.util';
import { DATA } from '@utils/data.util';
import { StorageService } from './storage.service';

const ALL_WORDS: Word[] = DATA.flat()
  .flatMap((category) => category.groups)
  .flatMap((group) => group.words);

const LEVEL_1: Level = 1;

@Injectable()
export class ExerciceService {
  private _storageService = inject(StorageService);

  nbWords = signal<number>(ALL_WORDS.length).asReadonly();
  state = signal<State>(this.getState(LEVEL_1));

  level = computed<Level>(() => this.state().level);
  wordsAnswered = computed<Word[]>(() => this.state().wordsAnswered);
  wordsRemaining = computed<Word[]>(() => this.state().wordsRemaining);
  word = computed<Word | undefined>(() => this.wordsRemaining()[0]);
  progressPercent = computed<number>(
    () => (this.wordsAnswered().length * 100) / this.nbWords()
  );

  _saveStateEffect = effect(() => {
    const state = this.state();
    this._storageService.write(
      `EXERCICE_STATE_LEVEL_${state.level}`,
      JSON.stringify(state)
    );
  });

  answerWord() {
    this.state.update(({ wordsRemaining, wordsAnswered, level }) => {
      return {
        wordsRemaining: wordsRemaining.slice(1),
        wordsAnswered: [...wordsAnswered, wordsRemaining[0]],
        level,
      };
    });
  }

  setLevel(level: Level) {
    this.state.set(this.getState(level));
  }

  reset() {
    this.state.update(({ level }) => ({
      wordsRemaining: shuffle(ALL_WORDS),
      wordsAnswered: [],
      level,
    }));
  }

  private getState(level: Level): State {
    const data = this._storageService.read(`EXERCICE_STATE_LEVEL_${level}`);
    return data
      ? (JSON.parse(data) as State)
      : {
          wordsRemaining: shuffle(ALL_WORDS),
          wordsAnswered: [],
          level: level,
        };
  }
}

interface State {
  wordsRemaining: Word[];
  wordsAnswered: Word[];
  level: Level;
}
