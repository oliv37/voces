import { Component, input, model } from '@angular/core';
import { StarFillIconComponent } from '../../icon/star-fill-icon/star-fill-icon.component';
import { StarIconComponent } from '../../icon/star-icon/star-icon.component';
import { Level, LEVELS } from '@models/exercice.model';

@Component({
  selector: 'app-exercice-level-picker',
  imports: [StarFillIconComponent, StarIconComponent],
  templateUrl: './exercice-level-picker.component.html',
})
export class ExerciceLevelPickerComponent {
  readonly levels = LEVELS;

  fillColor = input<string>('fill-gray-800');
  level = model.required<Level>();
}
