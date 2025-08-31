import {
  Component,
  effect,
  ElementRef,
  input,
  untracked,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-exercice-progress-bar',
  templateUrl: './exercice-progress-bar.html',
})
export class ExerciceProgressBar {
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
