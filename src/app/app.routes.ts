import { Routes } from '@angular/router';
import { NotFoundPage } from '@pages/not-found/not-found-page';
import { HomePage } from '@pages/home/home-page';
import { exerciceTitleResolver } from '@resolvers/exercice-title.resolver';
import { ExercicePage } from '@pages/exercice/exercice-page';
import { canMatchExercice } from '@guards/exercice-guard';
import { wordGroupsResolver } from '@resolvers/word-groups-resolver';
import { wordGroupResolver } from '@resolvers/word-group-resolver';

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
