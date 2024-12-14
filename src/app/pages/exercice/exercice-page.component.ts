import { Component, computed, effect, inject, viewChild } from '@angular/core';
import { ClientSideComponent } from '../../components/client-side/client-side.component';
import { Level, LEVELS } from '@models/exercice.model';
import { ExerciceLevel1Component } from '../../components/exercice/exercice-level-1/exercice-level-1.component';
import { ExerciceLevel2Component } from '../../components/exercice/exercice-level-2/exercice-level-2.component';
import { ExerciceLevel3Component } from '../../components/exercice/exercice-level-3/exercice-level-3.component';
import { ExerciceButtonBarComponent } from '../../components/exercice/exercice-button-bar/exercice-button-bar.component';
import { ExerciceLevelComponent } from '@components/exercice/exercice-level.component';
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { ExerciceLevelPickerComponent } from '../../components/exercice/exercice-level-picker/exercice-level-picker.component';
import { WordsGridComponent } from '../../components/words-grid/words-grid.component';
import { ExerciceService } from '@services/exercice.service';
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
    SpacerComponent,
    ExerciceLevelPickerComponent,
    WordsGridComponent,
    MetaDirective,
  ],
  providers: [ExerciceService],
  templateUrl: './exercice-page.component.html',
})
export class ExercicePageComponent {
  readonly levels = LEVELS;

  private _exerciceService = inject(ExerciceService);

  nbWords = this._exerciceService.nbWords;
  wordsAnswered = this._exerciceService.wordsAnswered;
  wordsRemaining = this._exerciceService.wordsRemaining;
  word = this._exerciceService.word;
  level = this._exerciceService.level;
  progressPercent = this._exerciceService.progressPercent;

  wordsAnsweredReversed = computed<Word[]>(() =>
    this.wordsAnswered().reverse()
  );

  exerciceLevelCmp = viewChild<ExerciceLevelComponent>('exerciceLevelCmp');

  focusEffect = effect(() => {
    this._exerciceService.state();

    this.exerciceLevelCmp()?.focus();
  });

  answerWord() {
    this._exerciceService.answerWord();
  }

  setLevel(level: Level) {
    this._exerciceService.setLevel(level);
  }

  reset() {
    this._exerciceService.reset();
  }

  help() {
    this.exerciceLevelCmp()?.help();
    this.exerciceLevelCmp()?.focus();
  }
}
