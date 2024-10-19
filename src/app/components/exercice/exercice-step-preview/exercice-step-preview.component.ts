import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { ExerciceService } from '@services/exercice.service';
import { RouterLink } from '@angular/router';
import { IgnoreTarget } from '@decorators/ignore-event-target.decorator';
import { BtnDirective } from '@directives/btn/btn.directive';
import { SpacerComponent } from '@components/spacer/spacer.component';
import { CaretRightSvgComponent } from '../../svg/caret-right-svg/caret-right-svg.component';

@Component({
  selector: 'app-exercice-step-preview',
  standalone: true,
  templateUrl: './exercice-step-preview.component.html',
  imports: [RouterLink, BtnDirective, SpacerComponent, CaretRightSvgComponent],
  host: {
    tabIndex: '-1',
    class: 'outline-none',
  },
})
export class ExerciceStepPreviewComponent {
  private _elementRef = inject(ElementRef);
  exerciceService = inject(ExerciceService);

  constructor() {
    afterNextRender(() => this._elementRef.nativeElement.focus());
  }

  @HostListener('keydown.Enter', ['$event'])
  @IgnoreTarget('button', 'a')
  onEnter() {
    this.exerciceService.goToNextStep();
  }
}
