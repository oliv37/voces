import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  viewChild,
} from '@angular/core';
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
import { ExerciceService } from './exercice.service';
import { MetaDirective } from '../../directives/meta.directive';

@Component({
  imports: [
    ClientSideComponent,
    ExerciceLevel1Component,
    ExerciceLevel2Component,
    ExerciceLevel3Component,
    ExerciceButtonBarComponent,
    ExerciceGroupLinkComponent,
    MetaDirective,
  ],
  templateUrl: './exercice-page.component.html',
})
export class ExercicePageComponent implements OnDestroy {
  readonly levels = LEVELS;

  private _exerciceService = inject(ExerciceService);

  exerciceLevelCmp = viewChild<ExerciceLevelComponent>('exerciceLevelCmp');

  group = input<Group>();
  level = this._exerciceService.level;
  wordIdx = this._exerciceService.wordIdx;
  word = this._exerciceService.word;
  nbWords = this._exerciceService.nbWords;
  progressPercent = this._exerciceService.progressPercent;

  nextGroup = computed<Group | undefined>(() => {
    const group = this.group();
    return group ? findNextGroup(group) : undefined;
  });

  _focusEffect = effect(() => {
    this._exerciceService.state();

    this.exerciceLevelCmp()?.focus();
  });

  _groupEffect = effect(() => {
    this._exerciceService.group.set(this.group());
  });

  ngOnDestroy() {
    this._exerciceService.group.set(undefined);
  }

  reset() {
    this._exerciceService.reset();
  }

  previousWord() {
    this._exerciceService.previousWord();
  }

  nextWord() {
    this._exerciceService.nextWord();
  }

  answerWord() {
    this._exerciceService.answerWord();
  }

  previousLevel() {
    this._exerciceService.previousLevel();
  }

  nextLevel() {
    this._exerciceService.nextLevel();
  }

  setLevel(level: Level) {
    this._exerciceService.setLevel(level);
  }

  help() {
    this.exerciceLevelCmp()?.help();
    this.exerciceLevelCmp()?.focus();
  }
}
