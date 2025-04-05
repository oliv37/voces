import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  untracked,
  viewChild,
} from '@angular/core';
import { ClientSideComponent } from '@components/client-side/client-side.component';
import { Group } from '@models/group.model';
import { ExerciceLevel1Component } from '@components/exercice/exercice-level-1/exercice-level-1.component';
import { ExerciceLevel2Component } from '@components/exercice/exercice-level-2/exercice-level-2.component';
import { ExerciceLevelComponent } from '@components/exercice/exercice-level.component';
import { Level } from '@models/exercice.model';
import { findNextGroup } from '@utils/group.util';
import { ExerciceGroupLinkComponent } from '@components/exercice/exercice-group-link/exercice-group-link.component';
import { ExerciceService } from './exercice.service';
import { MetaDirective } from '@directives/meta.directive';
import { ExerciceBarComponent } from '@components/exercice/exercice-bar/exercice-bar.component';

@Component({
  imports: [
    ClientSideComponent,
    ExerciceLevel1Component,
    ExerciceLevel2Component,
    ExerciceGroupLinkComponent,
    MetaDirective,
    ExerciceBarComponent,
  ],
  templateUrl: './exercice-page.component.html',
})
export class ExercicePageComponent implements OnDestroy {
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

    untracked(() => {
      this.exerciceLevelCmp()?.focus();
    });
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

  answerWord() {
    this._exerciceService.answerWord();
  }

  setLevel(level: Level) {
    this._exerciceService.setLevel(level);
  }

  help() {
    this.exerciceLevelCmp()?.help();
    this.exerciceLevelCmp()?.focus();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
