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
  wordIdx = input.required<number>();
  nbWords = input.required<number>();
  progressPercent = input.required<number>();
  bgColor = input.required<string>();

  wordIndexEl = viewChild<ElementRef<HTMLDivElement>>('wordIndex');

  animateEffect = effect(() => {
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
