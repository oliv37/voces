import { Routes } from '@angular/router';
import { wordGroupsResolver } from './word/resolvers/word-groups-resolver';
import { wordGroupResolver } from './word/resolvers/word-group-resolver';
import { HomePage } from './home/home-page';
import { WordExercicePage } from './word/word-exercice/word-exercice-page';
import { wordExerciceTitleResolver } from './word/word-exercice/resolvers/word-exercice-title-resolver';
import { canMatchWordExercice } from './word/word-exercice/guards/word-exercice-guard';
import { NotFoundPage } from './not-found/not-found-page';
import { WordPage } from './word/word-page';
import { nbWordsResolver } from './word/resolvers/words-resolver';
import { TextPage } from './text/text-page';
import {
  otherTextsResolver,
  textResolver,
  textsResolver,
} from './text/resolvers/text-resolver';
import { canMatchText } from './text/guards/text-guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Vocabulaire et Textes en Espagnol - Voces',
    component: HomePage,
    resolve: {
      nbWords: nbWordsResolver,
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
