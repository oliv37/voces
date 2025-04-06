import {
  afterRender,
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
import { AbstractExerciceLevelComponent } from '@components/exercice/abstract-exercice-level.component';
import { Level } from '@models/exercice.model';
import { findNextGroup } from '@utils/group.util';
import { ExerciceGroupLinkComponent } from '@components/exercice/exercice-group-link/exercice-group-link.component';
import { ExerciceService } from './exercice.service';
import { MetaDirective } from '@directives/meta.directive';
import { ExerciceButtonBarComponent } from '@components/exercice/exercice-button-bar/exercice-button-bar.component';
import { ExerciceProgressBarComponent } from '@components/exercice/exercice-progress-bar/exercice-progress-bar.component';
import { AnimationService } from '@services/animation.service';

@Component({
  imports: [
    ClientSideComponent,
    ExerciceLevel1Component,
    ExerciceLevel2Component,
    ExerciceGroupLinkComponent,
    MetaDirective,
    ExerciceButtonBarComponent,
    ExerciceProgressBarComponent,
  ],
  templateUrl: './exercice-page.component.html',
})
export class ExercicePageComponent implements OnDestroy {
  private _exerciceService = inject(ExerciceService);
  private _animationService = inject(AnimationService);

  exerciceLevelCmp =
    viewChild<AbstractExerciceLevelComponent>('exerciceLevelCmp');

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

  constructor() {
    afterRender(() => this._animationService.isAnimationEnabled.set(true));
  }

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
