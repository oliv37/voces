import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  untracked,
} from '@angular/core';
import { Text } from '../models/text';
import { WordValidator, WordValidatorResult } from '../../word/models/word';
import { DefaultWordValidator } from '../../word/services/default-word-validator';
import { TextCompletion } from './text-completion';

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
  #textCompletion = inject(TextCompletion);

  #state = signal<State>(EMPTY_STATE);

  #text = computed<Text>(() => this.#state().text);
  inputTextValue = computed<string>(() => this.#state().inputTextValue);
  textContentIdx = computed<number>(() => this.#state().textContentIdx);
  wordIdx = computed<number>(() => this.#state().wordIdx);

  textContent = computed<string>(() => {
    const { text, textContentIdx } = this.#state();

    return text.contents[textContentIdx] || '';
  });

  words = computed<string[]>(() => {
    const textContent = this.textContent();
    const words = textContent.split(' ');

    return words.flatMap((word, idx) => {
      const isLastWord = idx === words.length - 1;
      return isLastWord ? word : [word, ' '];
    });
  });

  word = computed<string>(() => {
    const words = this.words();
    const wordIdx = this.wordIdx();

    return words[wordIdx] || '';
  });

  #wordValidator = computed<WordValidator>(() => {
    const word = this.word();

    return new DefaultWordValidator(word);
  });

  wordValidatorResult = computed<WordValidatorResult>(() => {
    const inputTextValue = this.inputTextValue();
    const wordValidator = this.#wordValidator();

    return wordValidator.validate(inputTextValue);
  });

  #isLastWord = computed<boolean>(() => {
    const words = this.words();
    const wordIdx = this.wordIdx();

    return wordIdx >= words.length - 1;
  });

  #currentPage = computed<number>(() => {
    const textContentIdx = this.textContentIdx();

    return textContentIdx + 1;
  });

  validateInputTextValueEffect = effect(() => {
    const wordValidatorResult = this.wordValidatorResult();

    if (wordValidatorResult.isValid) {
      untracked(() => this.#next());
    }
  });

  changeCurrentPageEffect = effect(() => {
    const text = this.#text();
    const currentPage = this.#currentPage();

    untracked(() => this.#textCompletion.saveCurrentPage(text, currentPage));
  });

  setText = (text: Text) => {
    const currentPage = this.#textCompletion.getCurrentPage(text);

    this.#state.set({
      text,
      textContentIdx: currentPage - 1,
      wordIdx: 0,
      inputTextValue: '',
    });
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
      const currentPage = this.#currentPage();

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
