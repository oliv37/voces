import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtnDirective } from '@directives/btn/btn.directive';
import { ExerciceService } from '@services/exercice.service';
import { ArrowClockwiseSvgComponent } from '../../svg/arrow-clockwise-svg/arrow-clockwise-svg.component';
import { ArrowLeftRightSvgComponent } from '../../svg/arrow-left-right-svg/arrow-left-right-svg.component';

@Component({
  selector: 'app-exercice-header',
  templateUrl: './exercice-header.component.html',
  imports: [
    BtnDirective,
    RouterLink,
    ArrowClockwiseSvgComponent,
    ArrowLeftRightSvgComponent,
  ],
  standalone: true,
})
export class ExerciceHeaderComponent {
  nbWordsAnswered = input.required<number>();
  nbWordsAvailable = input.required<number>();
  areAllWordsAnswered = input.required<boolean>();

  exerciceService = inject(ExerciceService);
}
