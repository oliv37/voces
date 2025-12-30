import { Routes } from '@angular/router';
import { HomePage } from './home/home-page/home-page';
import { NotFoundPage } from './not-found/not-found-page/not-found-page';
import { wordGroupsResolver } from '@word/word-groups-resolver';
import { wordGroupResolver } from '@word/word-group-resolver';
import { WordExercicePage } from '@word/word-exercice/word-exercice-page/word-exercice-page';
import { wordExerciceTitleResolver } from '@word/word-exercice/word-exercice-title-resolver';
import { canMatchWordExercice } from '@word/word-exercice/word-exercice-guard';
import { WordPage } from '@word/word-page/word-page';
import { wordsResolver } from '@word/words-resolver';
import { TextPage } from '@text/text-page/text-page';
import {
  otherTextsResolver,
  textResolver,
  textsResolver,
} from './text/text-resolver';
import { canMatchText } from './text/text-guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Vocabulaire et Textes en Espagnol - Voces',
    component: HomePage,
    resolve: {
      words: wordsResolver,
      texts: textsResolver,
    },
  },
  {
    path: 'word',
    children: [
      {
        path: '',
        title: 'Vocabulaire Espagnol - Voces',
        component: WordPage,
        resolve: {
          wordGroups: wordGroupsResolver,
        },
      },
      {
        path: 'exercice/:id',
        title: wordExerciceTitleResolver,
        component: WordExercicePage,
        canMatch: [canMatchWordExercice],
        resolve: {
          wordGroups: wordGroupsResolver,
          wordGroup: wordGroupResolver,
        },
      },
    ],
  },
  {
    path: 'text/:id',
    title: 'Texte en Espagnol - Voces',
    component: TextPage,
    canMatch: [canMatchText],
    resolve: {
      text: textResolver,
      otherTexts: otherTextsResolver,
    },
  },
  {
    path: '**',
    component: NotFoundPage,
    title: 'Page non trouvée | Voces',
  },
];
