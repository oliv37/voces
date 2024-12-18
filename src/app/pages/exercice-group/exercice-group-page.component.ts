import { Component, computed, effect, inject, viewChild } from '@angular/core';
import { ClientSideComponent } from '@components/client-side/client-side.component';
import { Group } from '@models/group.model';
import { ExerciceLevel1Component } from '../../components/exercice/exercice-level-1/exercice-level-1.component';
import { ExerciceLevel2Component } from '../../components/exercice/exercice-level-2/exercice-level-2.component';
import { ExerciceLevel3Component } from '../../components/exercice/exercice-level-3/exercice-level-3.component';
import { ExerciceLevelComponent } from '@components/exercice/exercice-level.component';
import { Level, LEVELS } from '@models/exercice.model';
import { findNextGroup } from '@utils/group.util';
import { ExerciceButtonBarComponent } from '../../components/exercice/exercice-button-bar/exercice-button-bar.component';
import { ExerciceGroupLinkComponent } from '../../components/exercice/exercice-group-link/exercice-group-link.component';
import { ExerciceLevelPickerComponent } from '../../components/exercice/exercice-level-picker/exercice-level-picker.component';
import { ExerciceGroupService } from './exercice-group.service';
import { MetaDirective } from '../../directives/meta.directive';

@Component({
  imports: [
    ClientSideComponent,
    ExerciceLevel1Component,
    ExerciceLevel2Component,
    ExerciceLevel3Component,
    ExerciceButtonBarComponent,
    ExerciceGroupLinkComponent,
    ExerciceLevelPickerComponent,
    MetaDirective,
  ],
  providers: [ExerciceGroupService],
  templateUrl: './exercice-group-page.component.html',
})
export class ExerciceGroupPageComponent {
  readonly levels = LEVELS;

  private _exerciceGroupService = inject(ExerciceGroupService);

  exerciceLevelCmp = viewChild<ExerciceLevelComponent>('exerciceLevelCmp');

  group = this._exerciceGroupService.group;
  level = this._exerciceGroupService.level;
  wordIdx = this._exerciceGroupService.wordIdx;
  word = this._exerciceGroupService.word;
  nbWords = this._exerciceGroupService.nbWords;
  progressPercent = this._exerciceGroupService.progressPercent;

  nextGroup = computed<Group | undefined>(() => {
    const group = this.group();
    return group ? findNextGroup(group) : undefined;
  });

  _focusEffect = effect(() => {
    this._exerciceGroupService.state();

    this.exerciceLevelCmp()?.focus();
  });

  reset() {
    this._exerciceGroupService.reset();
  }

  previousWord() {
    this._exerciceGroupService.previousWord();
  }

  nextWord() {
    this._exerciceGroupService.nextWord();
  }

  answerWord() {
    this._exerciceGroupService.answerWord();
  }

  previousLevel() {
    this._exerciceGroupService.previousLevel();
  }

  nextLevel() {
    this._exerciceGroupService.nextLevel();
  }

  setLevel(level: Level) {
    this._exerciceGroupService.setLevel(level);
  }

  help() {
    this.exerciceLevelCmp()?.help();
    this.exerciceLevelCmp()?.focus();
  }
}
