import { Letter } from './letter.model';
import { WordValidator, WordValidationResult } from './word.model';

export class InsensitiveCaseWordValidator implements WordValidator {
  readonly word: string;
  readonly #wordWithReplacedLetters: string;

  constructor(word: string) {
    this.word = word;
    this.#wordWithReplacedLetters = this.#replaceLetters(word);
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

  #replaceLetters(word: string): string {
    let wordWithReplacedLetters = word;

    for (const [oldLetter, newLetter] of Object.entries(lettersToReplace)) {
      wordWithReplacedLetters = wordWithReplacedLetters
        .replaceAll(oldLetter.toLowerCase(), newLetter.toLowerCase())
        .replaceAll(oldLetter.toUpperCase(), newLetter.toUpperCase());
    }

    return wordWithReplacedLetters;
  }

  #computeWordLetters(textValue: string) {
    const wordLetters: Letter[] = [];

    for (let i = 0; i < this.word.length; i++) {
      const letterValue: string | undefined = textValue[i];
      if (letterValue !== undefined) {
        wordLetters.push({
          value: this.word[i],
          isValid:
            letterValue.toLowerCase() === this.word[i].toLowerCase() ||
            letterValue.toLowerCase() ===
              this.#wordWithReplacedLetters[i].toLowerCase(),
        });
      } else {
        wordLetters.push({ value: this.word[i] });
      }
    }

    return wordLetters;
  }
}

const lettersToReplace: Record<string, string> = {
  ñ: 'n',
  ó: 'o',
  ú: 'u',
  á: 'a',
  ã: 'a',
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
  '…': '.',
};
