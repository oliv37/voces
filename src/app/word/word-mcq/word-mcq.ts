import { Component, input, linkedSignal } from '@angular/core';
import { VisibleOnClient } from '@shared/client/visible-on-client';
import { pickNRandomElems } from '@shared/misc/array';
import { Word } from '@word/word.model';

interface McqState {
  choices: (Word & { disabled?: boolean })[];
  answer: Word;
  direction: 'FR-ES' | 'ES-FR';
}

@Component({
  selector: 'app-word-mcq',
  imports: [VisibleOnClient],
  templateUrl: './word-mcq.html',
})
export class WordMcq {
  readonly words = input.required<Word[]>();

  protected readonly mcqState = linkedSignal<McqState>(() => {
    const words = this.words();
    return this.generateMcqState(words);
  });

  protected checkAnswer(answer: Word) {
    if (answer !== this.mcqState().answer) {
      this.mcqState.update((prevMcqState) => ({
        ...prevMcqState,
        choices: prevMcqState.choices.map((choice) =>
          choice === answer ? { ...choice, disabled: true } : choice
        ),
      }));
      return;
    }

    const words = this.words();
    this.mcqState.set(this.generateMcqState(words));
  }

  private generateMcqState(words: Word[]): McqState {
    const choices = pickNRandomElems(words, 4);
    const answer = choices[Math.floor(Math.random() * choices.length)];
    const direction = 'ES-FR';

    return {
      choices,
      answer,
      direction,
    };
  }
}
