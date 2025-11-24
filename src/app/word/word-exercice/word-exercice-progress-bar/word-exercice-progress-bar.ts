import {
  Component,
  effect,
  ElementRef,
  input,
  untracked,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-word-exercice-progress-bar',
  templateUrl: './word-exercice-progress-bar.html',
})
export class WordExerciceProgressBar {
  readonly wordIdx = input.required<number>();
  readonly nbWords = input.required<number>();
  readonly progressPercent = input.required<number>();
  readonly bgColor = input.required<string>();

  protected readonly wordIndexEl =
    viewChild<ElementRef<HTMLDivElement>>('wordIndex');

  protected readonly animateEffect = effect(() => {
    if (this.wordIdx() == 0) {
      return;
    }

    untracked(() => {
      this.wordIndexEl()?.nativeElement.animate(
        [{ transform: 'translateY(-50%)' }, { transform: 'translateY(0)' }],
        { duration: 300 }
      );
    });
  });
}
