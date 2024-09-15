import {
  computed,
  effect,
  inject,
  Injectable,
  Signal,
  signal,
} from '@angular/core';
import { findRandomWords } from '../utils/words.util';
import { Word, WordsGroup } from '../models/word.model';
import { WordsGroupCompletionService } from './words-group-completion.service';

type Step = (typeof STEPS)[number];

const STEPS = ['preview', 'form'] as const;

const FIRST_STEP = STEPS[0];

const NB_WORDS_IN_EXERCICE = 10;

@Injectable()
export class WordsExerciceService {
  private _wordsGroupCompletionService = inject(WordsGroupCompletionService);

  private _wordsGroup = signal<WordsGroup | undefined>(undefined);
  private _wordsAvailable = computed<Word[]>(
    () => this._wordsGroup()?.words ?? []
  );
  private _words = signal<Word[]>([]);
  private _wordIdsAnswered = signal<number[]>([]);
  private _formValues = signal<string[]>([]);
  private _formValuesValidities = computed<boolean[]>(() => {
    const words = this.words();
    return this.formValues().map(
      (formValue, i) =>
        formValue?.toLowerCase() === words[i].value.toLowerCase()
    );
  });
  private _stepIndex = computed<number>(() => STEPS.indexOf(this.step()));
  private _areAllWordsAvailableAnswered = computed<boolean>(
    () => this.nbWordsAnswered() >= this.nbWordsAvailable()
  );

  lastInputFocusIndex = signal<number>(0);
  step = signal<Step>(FIRST_STEP);
  words: Signal<Word[]> = this._words.asReadonly();
  formValues: Signal<string[]> = this._formValues.asReadonly();
  nbWordsAvailable = computed<number>(() => this._wordsAvailable().length);
  nbWordsAnswered = computed<number>(() => this._wordIdsAnswered().length);
  nbWords = computed<number>(() => this._words().length);
  nbFormValues = computed<number>(() => this._formValues().length);
  nbFormValuesValid = computed<number>(
    () => this._formValuesValidities().filter((isValid) => isValid).length
  );
  isFormWin = computed<boolean>(() =>
    this._formValuesValidities().every((isValid) => isValid)
  );
  areAllWordsAnswered = computed<boolean>(
    () => this.nbWordsAnswered() >= this.nbWordsAvailable()
  );

  constructor() {
    // [Effect] mark wordsGroup as completed if all words are answered
    effect(() => {
      const wordsGroup = this._wordsGroup();
      if (wordsGroup && this._areAllWordsAvailableAnswered()) {
        this._wordsGroupCompletionService.markAsCompleted(wordsGroup);
      }
    });
  }

  getFormValue(index: number): string {
    return this._formValues()[index];
  }

  setFormValue(index: number, newValue: string): void {
    this._formValues.set(
      this._formValues().map((value, idx) => (index === idx ? newValue : value))
    );
  }

  isFormValueValid(index: number): boolean {
    return this._formValuesValidities()[index];
  }

  reinit(wordsGroup?: WordsGroup): void {
    this._wordsGroup.set(wordsGroup ?? this._wordsGroup());
    this._wordIdsAnswered.set([]);
    this._words.set(
      findRandomWords(this._wordsAvailable(), NB_WORDS_IN_EXERCICE)
    );
    this._formValues.set(this._words().map((_) => ''));
    this.lastInputFocusIndex.set(0);
    this.step.set(FIRST_STEP);
  }

  nextExercice(): void {
    this._wordIdsAnswered.set(this.computeWordsIdAnswered());
    this._words.set(
      findRandomWords(
        this._wordsAvailable(),
        NB_WORDS_IN_EXERCICE,
        this._wordIdsAnswered()
      )
    );
    this._formValues.set(this._words().map((_) => ''));
    this.lastInputFocusIndex.set(0);
    this.step.set(FIRST_STEP);
  }

  goToPreviousStep(): void {
    const previousStepIndex = this._stepIndex() - 1;
    if (previousStepIndex >= 0) {
      this.step.set(STEPS[previousStepIndex]);
    }
  }

  goToNextStep(): void {
    const nextStepIndex = this._stepIndex() + 1;
    if (nextStepIndex < STEPS.length) {
      this.step.set(STEPS[nextStepIndex]);
    } else {
      this.nextExercice();
    }
  }

  private computeWordsIdAnswered(): number[] {
    const wordIdsAnsweredToAdd: number[] = this._words()
      .filter((_, i) => this.isFormValueValid(i))
      .map((word) => word.id);
    return [...new Set([...this._wordIdsAnswered(), ...wordIdsAnsweredToAdd])];
  }
}
