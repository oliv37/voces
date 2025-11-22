import { Letter } from './letter.model';
import { WordValidator, WordValidationResult } from './word.model';

export class CleanWordValidator implements WordValidator {
  readonly word: string;
  readonly #wordCleaned: string;

  constructor(word: string) {
    this.word = word;
    this.#wordCleaned = this.#cleanWord(word);
  }

  validate(textValue: string): WordValidationResult {
    const wordLetters: Letter[] = this.#computeWordLetters(textValue);
    const isValid =
      textValue.length === this.word.length &&
      wordLetters.every((wordLetter) => wordLetter.isValid);

    return {
      isValid,
      wordLetters,
    };
  }

  #cleanWord(word: string): string {
    let wordClean = word;

    for (const [oldLetter, newLetter] of Object.entries(lettersToClean)) {
      wordClean = wordClean
        .replaceAll(oldLetter, newLetter)
        .replaceAll(oldLetter.toUpperCase(), newLetter.toUpperCase());
    }

    return wordClean;
  }

  #computeWordLetters(textValue: string) {
    const wordLetters: Letter[] = [];

    for (let i = 0; i < this.word.length; i++) {
      const letterValue: string | undefined = textValue[i];
      if (letterValue !== undefined) {
        wordLetters.push({
          value: this.word[i],
          isValid:
            letterValue === this.word[i] ||
            letterValue === this.#wordCleaned[i],
        });
      } else {
        wordLetters.push({ value: this.word[i] });
      }
    }

    return wordLetters;
  }
}

const lettersToClean: Record<string, string> = {
  ñ: 'n',
  ó: 'o',
  ú: 'u',
  á: 'a',
  é: 'e',
  ë: 'e',
  è: 'e',
  í: 'i',
  '¿': '?',
  '¡': '!',
  '“': '"',
  '”': '"',
  '–': '-',
  '—': '-',
};
