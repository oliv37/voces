import { Component, computed, effect, inject, viewChild } from '@angular/core';
import { ClientSideComponent } from '../../components/client-side/client-side.component';
import { Level, LEVELS } from '@models/exercice.model';
import { ExerciceLevel1Component } from '../../components/exercice/exercice-level-1/exercice-level-1.component';
import { ExerciceLevel2Component } from '../../components/exercice/exercice-level-2/exercice-level-2.component';
import { ExerciceLevel3Component } from '../../components/exercice/exercice-level-3/exercice-level-3.component';
import { ExerciceButtonBarComponent } from '../../components/exercice/exercice-button-bar/exercice-button-bar.component';
import { ExerciceLevelComponent } from '@components/exercice/exercice-level.component';
import { ExerciceLevelPickerComponent } from '../../components/exercice/exercice-level-picker/exercice-level-picker.component';
import { WordsGridComponent } from '../../components/words-grid/words-grid.component';
import { ExerciceAllService } from './exercice-all.service';
import { Word } from '@models/word.model';
import { MetaDirective } from '../../directives/meta.directive';

@Component({
  selector: 'app-exercice-page',
  imports: [
    ClientSideComponent,
    ExerciceLevel1Component,
    ExerciceLevel2Component,
    ExerciceLevel3Component,
    ExerciceButtonBarComponent,
    ExerciceLevelPickerComponent,
    WordsGridComponent,
    MetaDirective,
  ],
  providers: [ExerciceAllService],
  templateUrl: './exercice-all-page.component.html',
})
export class ExerciceAllPageComponent {
  readonly levels = LEVELS;

  private _exerciceAllService = inject(ExerciceAllService);

  nbWords = this._exerciceAllService.nbWords;
  wordsAnswered = this._exerciceAllService.wordsAnswered;
  wordsRemaining = this._exerciceAllService.wordsRemaining;
  word = this._exerciceAllService.word;
  level = this._exerciceAllService.level;
  progressPercent = this._exerciceAllService.progressPercent;

  wordsAnsweredReversed = computed<Word[]>(() =>
    this.wordsAnswered().reverse()
  );

  exerciceLevelCmp = viewChild<ExerciceLevelComponent>('exerciceLevelCmp');

  focusEffect = effect(() => {
    this._exerciceAllService.state();

    this.exerciceLevelCmp()?.focus();
  });

  answerWord() {
    this._exerciceAllService.answerWord();
  }

  setLevel(level: Level) {
    this._exerciceAllService.setLevel(level);
  }

  reset() {
    this._exerciceAllService.reset();
  }

  help() {
    this.exerciceLevelCmp()?.help();
    this.exerciceLevelCmp()?.focus();
  }
}
