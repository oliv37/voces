import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  untracked,
} from '@angular/core';
import { Text } from './text.model';
import { WordValidator, WordValidationResult } from '../word/word.model';
import { CleanWordValidator } from '../word/clean-word-validator';
import { TextCompletion } from './text-completion';
import {
  getCompletedPages,
  getCurrentPage,
  isCompleted,
} from './text-completion-util';

interface State {
  text: Text;
  textContentIdx: number;
  wordIdx: number;
  inputTextValue: string;
}

const EMPTY_STATE: State = {
  text: {
    id: '',
    title: '',
    contents: [],
  },
  textContentIdx: 0,
  wordIdx: 0,
  inputTextValue: '',
};

@Injectable()
export class TextState {
  readonly #textCompletion = inject(TextCompletion);

  readonly #state = signal<State>(EMPTY_STATE);

  readonly #text = computed<Text>(() => this.#state().text);
  readonly #textContentIdx = computed<number>(
    () => this.#state().textContentIdx
  );

  readonly #textContent = computed<string>(() => {
    const { text, textContentIdx } = this.#state();

    return text.contents[textContentIdx] || '';
  });

  readonly #wordValidator = computed<WordValidator>(() => {
    const word = this.word();

    return new CleanWordValidator(word);
  });

  readonly #isLastWord = computed<boolean>(() => {
    const words = this.words();
    const wordIdx = this.wordIdx();

    return wordIdx >= words.length - 1;
  });

  readonly inputTextValue = computed<string>(
    () => this.#state().inputTextValue
  );
  readonly wordIdx = computed<number>(() => this.#state().wordIdx);

  readonly currentPage = computed<number>(() => {
    return this.#textContentIdx() + 1;
  });

  readonly completedPages = computed<number[]>(() => {
    const textCompletions = this.#textCompletion.textCompletions();
    const text = this.#text();

    return getCompletedPages(textCompletions, text);
  });

  readonly isCompleted = computed<boolean>(() => {
    const textCompletions = this.#textCompletion.textCompletions();
    const text = this.#text();

    return isCompleted(textCompletions, text);
  });

  readonly words = computed<string[]>(() => {
    const textContent = this.#textContent();
    const words = textContent.split(' ').filter((word) => !!word);

    return words.flatMap((word, idx) => {
      const isLastWord = idx === words.length - 1;
      return isLastWord ? word : [word, ' '];
    });
  });

  readonly word = computed<string>(() => {
    const words = this.words();
    const wordIdx = this.wordIdx();

    return words[wordIdx] || '';
  });

  readonly wordValidationResult = computed<WordValidationResult>(() => {
    const inputTextValue = this.inputTextValue();
    const wordValidator = this.#wordValidator();

    return wordValidator.validate(inputTextValue);
  });

  protected readonly validateWordEffect = effect(() => {
    const wordValidationResult = this.wordValidationResult();

    if (wordValidationResult.isValid) {
      untracked(() => this.#next());
    }
  });

  protected readonly changeCurrentPageEffect = effect(() => {
    const text = this.#text();
    const currentPage = this.currentPage();

    untracked(() => this.#textCompletion.saveCurrentPage(text, currentPage));
  });

  setText = (text: Text) => {
    const textCompletions = this.#textCompletion.textCompletions();
    const currentPage = getCurrentPage(textCompletions, text);

    this.#state.set({
      text,
      textContentIdx: currentPage - 1,
      wordIdx: 0,
      inputTextValue: '',
    });
  };

  setTextPage = (page: number) => {
    this.#state.update((prevState) => ({
      ...prevState,
      textContentIdx: page - 1,
      wordIdx: 0,
      inputTextValue: '',
    }));
  };

  setTextContentIdx = (textContentIdx: number) => {
    this.#state.update((prevState) => ({
      ...prevState,
      textContentIdx: textContentIdx % prevState.text.contents.length,
      wordIdx: 0,
      inputTextValue: '',
    }));
  };

  setInputTextValue = (inputTextValue: string) => {
    this.#state.update((prevState) => ({
      ...prevState,
      inputTextValue,
    }));
  };

  #next() {
    if (this.#isLastWord()) {
      const text = this.#text();
      const currentPage = this.currentPage();

      this.#textCompletion.saveCompletedPage(text, currentPage);
      this.#nextTextContent();
    } else {
      this.#nextWord();
    }
  }

  #nextTextContent() {
    this.#state.update((prevState) => ({
      ...prevState,
      inputTextValue: '',
      wordIdx: 0,
      textContentIdx:
        (prevState.textContentIdx + 1) % prevState.text.contents.length,
    }));
  }

  #nextWord() {
    const words = this.words();

    this.#state.update((prevState) => ({
      ...prevState,
      inputTextValue: '',
      wordIdx: (prevState.wordIdx + 1) % words.length,
    }));
  }
}
