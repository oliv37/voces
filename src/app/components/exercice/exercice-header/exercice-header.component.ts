import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtnDirective } from '@directives/btn/btn.directive';
import { ExerciceService } from '@services/exercice.service';
import { ArrowLeftRightIconComponent } from '@components/icon/arrow-left-right-icon/arrow-left-right-icon.component';
import { ArrowClockwiseIconComponent } from '@components/icon/arrow-clockwise-icon/arrow-clockwise-icon.component';

@Component({
  selector: 'app-exercice-header',
  templateUrl: './exercice-header.component.html',
  imports: [
    BtnDirective,
    RouterLink,
    ArrowClockwiseIconComponent,
    ArrowLeftRightIconComponent,
  ],
  standalone: true,
})
export class ExerciceHeaderComponent {
  nbWordsAnswered = input.required<number>();
  nbWordsAvailable = input.required<number>();
  areAllWordsAnswered = input.required<boolean>();

  exerciceService = inject(ExerciceService);
}
