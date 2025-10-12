import { Routes } from '@angular/router';
import { wordGroupsResolver } from '@shared/resolvers/word-groups-resolver';
import { wordGroupResolver } from '@shared/resolvers/word-group-resolver';
import { HomePage } from './home/home-page';
import { ExercicePage } from './exercice/exercice-page';
import { exerciceTitleResolver } from './exercice/resolvers/exercice-title.resolver';
import { canMatchExercice } from './exercice/guards/exercice-guard';
import { NotFoundPage } from './not-found/not-found-page';

export const routes: Routes = [
  {
    path: '',
    title: 'Vocabulaire Espagnol - Voces',
    component: HomePage,
    resolve: {
      wordGroups: wordGroupsResolver,
    },
  },
  {
    path: 'exercice/:id',
    title: exerciceTitleResolver,
    component: ExercicePage,
    canMatch: [canMatchExercice],
    resolve: {
      wordGroups: wordGroupsResolver,
      wordGroup: wordGroupResolver,
    },
  },
  {
    path: '**',
    component: NotFoundPage,
    title: 'Page non trouvée | Voces',
  },
];
