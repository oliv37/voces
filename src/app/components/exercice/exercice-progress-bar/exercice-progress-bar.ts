import { Component, input } from '@angular/core';
import { slideDown } from '@animations/slide-down';

@Component({
  selector: 'app-exercice-progress-bar',
  templateUrl: './exercice-progress-bar.html',
  animations: [slideDown('300ms')],
})
export class ExerciceProgressBar {
  wordIdx = input.required<number>();
  nbWords = input.required<number>();
  progressPercent = input.required<number>();
  bgColor = input.required<string>();
}
