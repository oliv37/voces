import { Letter } from '../models/letter';
import { WordValidator, WordValidationResult } from '../models/word';

const lettersToClean: Record<string, string> = {
  ñ: 'n',
  ó: 'o',
  ú: 'u',
  á: 'a',
  é: 'e',
  í: 'i',
  '¿': '?',
  '¡': '!',
};

export class DefaultWordValidator implements WordValidator {
  readonly word: string;
  private readonly wordCleaned: string;

  constructor(word: string) {
    this.word = word;
    this.wordCleaned = this.cleanWord();
  }

  validate(value: string): WordValidationResult {
    const wordLetters: Letter[] = this.computeWordLetters(value);
    const isValid =
      this.word.length > 0 &&
      value.length === this.word.length &&
      wordLetters.every((wordLetter) => wordLetter.isValid);

    return {
      isValid,
      wordLetters,
    };
  }

  private cleanWord(): string {
    let wordCleaned = this.word;

    for (const [oldLetter, newLetter] of Object.entries(lettersToClean)) {
      wordCleaned = wordCleaned
        .replaceAll(oldLetter, newLetter)
        .replaceAll(oldLetter.toUpperCase(), newLetter.toUpperCase());
    }

    return wordCleaned;
  }

  private computeWordLetters(value: string) {
    const wordLetters: Letter[] = [];

    for (let i = 0; i < this.word.length; i++) {
      const wordLetter: Letter = {
        value: this.word[i],
        isValid:
          value[i] !== undefined
            ? value[i] === this.word[i] || value[i] === this.wordCleaned[i]
            : undefined,
      };
      wordLetters.push(wordLetter);
    }

    return wordLetters;
  }
}
