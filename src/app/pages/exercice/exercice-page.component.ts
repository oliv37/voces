import {
  afterNextRender,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  untracked,
  viewChild,
} from '@angular/core';
import { ClientSide } from '@components/client-side/client-side';
import type { Group } from '@models/group';
import type { OpenGraph } from '@models/open-graph';
import type { Level } from '@models/exercice';
import { ExerciceLevel1Component } from '@components/exercice/exercice-level-1/exercice-level-1.component';
import { ExerciceLevel2Component } from '@components/exercice/exercice-level-2/exercice-level-2.component';
import { AbstractExerciceLevelComponent } from '@components/exercice/abstract-exercice-level.component';
import { Exercice } from '@services/exercice';
import { Meta } from '@directives/meta';
import { ExerciceButtonBarComponent } from '@components/exercice/exercice-button-bar/exercice-button-bar.component';
import { ExerciceProgressBarComponent } from '@components/exercice/exercice-progress-bar/exercice-progress-bar.component';
import { Animation } from '@services/animation';
import { ExerciceNextLinksComponent } from '@components/exercice/exercice-next-links/exercice-next-links.component';
import { GroupCompletion } from '@services/group-completion';

@Component({
  imports: [
    ClientSide,
    ExerciceLevel1Component,
    ExerciceLevel2Component,
    Meta,
    ExerciceButtonBarComponent,
    ExerciceProgressBarComponent,
    ExerciceNextLinksComponent,
  ],
  templateUrl: './exercice-page.component.html',
})
export class ExercicePageComponent implements OnDestroy {
  private _exercice = inject(Exercice);
  private _animation = inject(Animation);
  private _groupCompletion = inject(GroupCompletion);

  exerciceLevelCmp =
    viewChild<AbstractExerciceLevelComponent>('exerciceLevelCmp');

  group = input.required<Group>();

  level = this._exercice.level;
  wordIdx = this._exercice.wordIdx;
  word = this._exercice.word;
  nbWords = this._exercice.nbWords;
  progressPercent = this._exercice.progressPercent;
  isCompleted = this._exercice.isCompleted;
  hasUsedHelp = this._exercice.hasUsedHelp;

  isGroupCompleted = computed(() => {
    const group = this.group();
    return this._groupCompletion.isCompleted(group);
  });

  metaDescription = computed<string>(() => {
    const categoryLabel = this.group().category.label;
    const groupLabel = this.group().label;
    const words = this.group().words;

    return (
      'Exercez-vous sur les mots de Vocabulaire Espagnol ' +
      categoryLabel +
      ' Groupe ' +
      groupLabel +
      ' : ' +
      words.map((w) => w.es).join(' - ')
    );
  });

  metaOg = computed<OpenGraph>(() => {
    const categoryLabel = this.group().category.label;
    const groupLabel = this.group().label;
    const words = this.group().words;

    return {
      title: `Vocabulaire Espagnol ${categoryLabel} Groupe ${groupLabel}`,
      description:
        'Excercice sur les mots de Vocabulaire Espagnol ' +
        categoryLabel +
        ' Groupe ' +
        groupLabel +
        ' : ' +
        words.map((w) => w.es).join(' - '),
    };
  });

  _focusEffect = effect(() => {
    this._exercice.state();

    untracked(() => {
      this.exerciceLevelCmp()?.focus();
    });
  });

  _groupEffect = effect(() => {
    const group = this.group();

    this._exercice.group.set(group);
    this.scrollToTop();
  });

  constructor() {
    afterNextRender(() => this._animation.enableAnimation());
  }

  ngOnDestroy() {
    this._exercice.group.set(undefined);
  }

  resetLevel() {
    this._exercice.resetLevel();
  }

  answerWord() {
    this._exercice.answerWord();
  }

  setLevel(level: Level) {
    this._exercice.setLevel(level);
  }

  help() {
    this.exerciceLevelCmp()?.help();
    this.exerciceLevelCmp()?.focus();
    this._exercice.setHasUsedHelp(true);
  }

  private scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
