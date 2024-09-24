import {
  computed,
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  untracked,
} from '@angular/core';
import { findRandomWords } from '../utils/words.util';
import { Word, WordsCategory, WordsGroup } from '../models/words.model';
import { WordsCompletionService } from './words-completion.service';
import {
  WordsStep,
  FIRST_STEP,
  NB_WORDS_IN_EXERCICE,
  STEPS,
} from '../models/words-exercice.model';
import { WordsSettingService } from './words-setting.service';
import { getNextElems, groupBy } from '@shared/utils/array.util';

@Injectable()
export class WordsExerciceService {
  private _wordsCompletionService = inject(WordsCompletionService);
  private _wordsSettingService = inject(WordsSettingService);

  private _wordsCategory = signal<WordsCategory | undefined>(undefined);
  private _wordsGroup = signal<WordsGroup | undefined>(undefined);
  private _words = signal<Word[]>([]);
  private _wordIdsAnswered = signal<number[]>([]);
  private _formValues = signal<string[]>([]);
  private _lastInputFocusIndex = signal<number>(0);
  private _step = signal<WordsStep>(FIRST_STEP);

  private _wordsAvailable = computed<Word[]>(
    () => this._wordsGroup()?.words ?? []
  );
  private _formValuesValidations = computed<boolean[]>(() => {
    const words = this.words();
    const wordValueFn = this._wordValueFn();
    return this.formValues().map(
      (formValue, i) =>
        formValue?.toLowerCase() === wordValueFn(words[i])?.toLowerCase()
    );
  });
  private _stepIndex = computed<number>(() => STEPS.indexOf(this.step()));
  private _areAllWordsAvailableAnswered = computed<boolean>(
    () => this.nbWordsAnswered() >= this.nbWordsAvailable()
  );
  private _wordValueFn = computed<(word: Word) => string>(() => {
    return this.isReversed() ? (word) => word.fr : (word) => word.es;
  });
  private _wordTranslationFn = computed<(word: Word) => string>(() => {
    return this.isReversed() ? (word) => word.es : (word) => word.fr;
  });

  lastInputFocusIndex: Signal<number> = this._lastInputFocusIndex.asReadonly();
  step: Signal<WordsStep> = this._step.asReadonly();
  words: Signal<Word[]> = this._words.asReadonly();
  formValues: Signal<string[]> = this._formValues.asReadonly();

  nbWordsAvailable = computed<number>(() => this._wordsAvailable().length);
  nbWordsAnswered = computed<number>(() => this._wordIdsAnswered().length);
  nbWords = computed<number>(() => this._words().length);
  nbFormValues = computed<number>(() => this._formValues().length);
  nbFormValuesValid = computed<number>(
    () => this._formValuesValidations().filter((isValid) => isValid).length
  );
  areAllFormValuesValid = computed<boolean>(() =>
    this._formValuesValidations().every((isValid) => isValid)
  );
  areAllWordsAnswered = computed<boolean>(
    () => this.nbWordsAnswered() >= this.nbWordsAvailable()
  );
  isReversed = computed<boolean>(
    () => this._wordsSettingService.setting().isExerciceReversed
  );
  nextWordsGroup = computed<WordsGroup | undefined>(() => {
    const wordsGroups = this._wordsCategory()?.wordsGroups;
    const wordsGroup = this._wordsGroup();
    const nextWordsGroups = getNextElems(wordsGroups, wordsGroup);
    const nextWordsGroupsByCompletionAge = groupBy(
      nextWordsGroups,
      (wordsGroup) => this._wordsCompletionService.getCompletionAge(wordsGroup)
    );

    return (
      nextWordsGroupsByCompletionAge['LONG_TIME_AGO_OR_NEVER']?.[0] ??
      nextWordsGroupsByCompletionAge['LESS_THAN_FOUR_DAYS']?.[0]
    );
  });

  constructor() {
    // [Effect] mark wordsGroup as completed if all words are answered
    effect(() => {
      const wordsGroup = this._wordsGroup();
      if (wordsGroup && this._areAllWordsAvailableAnswered()) {
        this._wordsCompletionService.markAsCompleted(wordsGroup);
      }
    });

    // [Effect] update wordIdsAnswered when all form values are valid
    effect(
      () => {
        if (this.nbFormValuesValid() > 0) {
          this._wordIdsAnswered.set(
            untracked(() => this.computeWordsIdAnswered())
          );
        }
      },
      { allowSignalWrites: true }
    );
  }

  getWordValue(word: Word): string {
    return this._wordValueFn()(word);
  }

  getWordTranslation(word: Word): string {
    return this._wordTranslationFn()(word);
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
    return this._formValuesValidations()[index];
  }

  setLastInputFocusIndex(index: number) {
    this._lastInputFocusIndex.set(index);
  }

  reinit(): void;
  reinit(wordsCategory: WordsCategory, wordsGroup: WordsGroup): void;
  reinit(wordsCategory?: WordsCategory, wordsGroup?: WordsGroup): void {
    this._wordsCategory.set(wordsCategory ?? this._wordsCategory());
    this._wordsGroup.set(wordsGroup ?? this._wordsGroup());
    this._wordIdsAnswered.set([]);
    this.nextExercice();
  }

  reverse(): void {
    this._wordsSettingService.setIsExerciceReversed(!this.isReversed());
    this._wordIdsAnswered.set([]);
    this._formValues.set(this._words().map(() => ''));
    this._lastInputFocusIndex.set(0);
    this._step.set(FIRST_STEP);
  }

  nextExercice(): void {
    this._words.set(
      findRandomWords(
        this._wordsAvailable(),
        NB_WORDS_IN_EXERCICE,
        this._wordIdsAnswered()
      )
    );
    this._formValues.set(this._words().map(() => ''));
    this._lastInputFocusIndex.set(0);
    this._step.set(FIRST_STEP);
  }

  goToPreviousStep(): void {
    const previousStepIndex = this._stepIndex() - 1;
    if (previousStepIndex >= 0) {
      this._step.set(STEPS[previousStepIndex]);
    }
  }

  goToNextStep(): void {
    const nextStepIndex = this._stepIndex() + 1;
    if (nextStepIndex < STEPS.length) {
      this._step.set(STEPS[nextStepIndex]);
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
