import { Component, inject } from '@angular/core';
import { ExerciceService } from '@pages/exercice/exercice.service';
import { ExerciceLevelPickerComponent } from '../exercice-level-picker/exercice-level-picker.component';
import { Level } from '@models/exercice.model';

@Component({
  selector: 'app-exercice-level-info',
  imports: [ExerciceLevelPickerComponent],
  templateUrl: './exercice-level-info.component.html',
})
export class ExerciceLevelInfoComponent {
  private _exerciceService = inject(ExerciceService);

  group = this._exerciceService.group;
  level = this._exerciceService.level;
  wordIdx = this._exerciceService.wordIdx;
  nbWords = this._exerciceService.nbWords;

  setLevel(level: Level) {
    this._exerciceService.setLevel(level);
  }
}
