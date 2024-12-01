import { Component, output } from '@angular/core';
import { ArrowLeftIconComponent } from '../../icon/arrow-left-icon/arrow-left-icon.component';
import { ArrowLeftShortIconComponent } from '../../icon/arrow-left-short-icon/arrow-left-short-icon.component';
import { PatchQuestionIconComponent } from '../../icon/patch-question-icon/patch-question-icon.component';
import { ArrowClockwiseIconComponent } from '../../icon/arrow-clockwise-icon/arrow-clockwise-icon.component';
import { ArrowRightShortIconComponent } from '../../icon/arrow-right-short-icon/arrow-right-short-icon.component';
import { ArrowRightIconComponent } from '../../icon/arrow-right-icon/arrow-right-icon.component';
import { BtnDirective } from '@directives/btn/btn.directive';
import { ArrowLeftCircleFillIconComponent } from '../../icon/arrow-left-circle-fill/arrow-left-circle-fill-icon.component';
import { ArrowRightCircleFillIconComponent } from '../../icon/arrow-right-circle-fill/arrow-right-circle-fill-icon.component';

@Component({
  selector: 'app-exercice-button-bar',
  templateUrl: './exercice-button-bar.component.html',
  imports: [
    BtnDirective,
    ArrowLeftIconComponent,
    ArrowLeftShortIconComponent,
    PatchQuestionIconComponent,
    ArrowClockwiseIconComponent,
    ArrowRightShortIconComponent,
    ArrowRightIconComponent,
    ArrowLeftCircleFillIconComponent,
    ArrowRightCircleFillIconComponent,
  ],
})
export class ExerciceButtonBarComponent {
  arrowLeftCircleFill = output();
  arrowLeft = output();
  arrowLeftShort = output();
  patchQuestion = output();
  arrowClockwise = output();
  arrowRightShort = output();
  arrowRight = output();
  arrowRightCircle = output();
}