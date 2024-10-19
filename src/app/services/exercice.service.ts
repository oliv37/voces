import {
  computed,
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  untracked,
} from '@angular/core';
import { findRandomWords } from '../utils/word.util';
import { CompletionService } from '@services/completion.service';
import { SettingService } from '@services/setting.service';
import { getNextElems, groupBy } from '@utils/array.util';
import { Category } from '@models/category.model';
import { Group } from '@models/group.model';
import { Word } from '@models/word.model';

const STEPS = ['preview', 'form'] as const;
const FIRST_STEP = STEPS[0];
const NB_WORDS_IN_EXERCICE = 10;

type Step = (typeof STEPS)[number];

@Injectable()
export class ExerciceService {
  private _completionService = inject(CompletionService);
  private _settingService = inject(SettingService);

  private _category = signal<Category | undefined>(undefined);
  private _group = signal<Group | undefined>(undefined);
  private _words = signal<Word[]>([]);
  private _wordIdsAnswered = signal<number[]>([]);
  private _formValues = signal<string[]>([]);
  private _lastInputFocusIndex = signal<number>(0);
  private _step = signal<Step>(FIRST_STEP);

  private _wordsAvailable = computed<Word[]>(() => this._group()?.words ?? []);
  private _formValuesValidations = computed<boolean[]>(
    () => {
      const words = this.words();
      const wordValueFn = this._wordValueFn();
      return this.formValues().map(
        (formValue, i) =>
          formValue?.toLowerCase() === wordValueFn(words[i])?.toLowerCase()
      );
    },
    { equal: (arr1, arr2) => arr1.toString() === arr2.toString() }
  );
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
  step: Signal<Step> = this._step.asReadonly();
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
    () => this._settingService.setting().isExerciceReversed
  );
  nextGroup = computed<Group | undefined>(() => {
    const groups = this._category()?.groups;
    const group = this._group();
    const nextGroups = getNextElems(groups, group);
    const nextGroupsByCompletionAge = groupBy(nextGroups, (group) =>
      this._completionService.getCompletionAge(group)
    );

    return (
      nextGroupsByCompletionAge['LONG_TIME_AGO_OR_NEVER']?.[0] ??
      nextGroupsByCompletionAge['LESS_THAN_SIX_DAYS']?.[0]
    );
  });

  constructor() {
    // [Effect] mark group as completed if all words are answered
    effect(() => {
      const group = this._group();
      if (group && this._areAllWordsAvailableAnswered()) {
        this._completionService.markAsCompleted(group);
      }
    });

    // [Effect] update wordIdsAnswered when a word is answered
    effect(() => {
      const currentWordIdsAnswered: number[] = this._words()
        .filter((_, i) => this.isFormValueValid(i))
        .map((word) => word.id);

      untracked(() => {
        this._wordIdsAnswered.update((existingWordsIdsAnswered) => [
          ...new Set([...existingWordsIdsAnswered, ...currentWordIdsAnswered]),
        ]);
      });
    });
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
  reinit(category: Category, group: Group): void;
  reinit(category?: Category, group?: Group): void {
    this._category.set(category ?? this._category());
    this._group.set(group ?? this._group());
    this._wordIdsAnswered.set([]);
    this.nextExercice();
  }

  reverse(): void {
    this._settingService.setIsExerciceReversed(!this.isReversed());
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
}
