import { Routes } from '@angular/router';
import { categoryResolver } from '@resolvers/category-resolver';
import { groupResolver } from '@resolvers/group-resolver';
import { categoryTitleResolver } from '@resolvers/category-title-resolver';
import { exerciceTitleResolver } from '@resolvers/exercice-title.resolver';
import { NotFoundPage } from '@pages/not-found/not-found-page';
import { CategoryPage } from '@pages/category/category-page';
import { canMatchCategory } from '@guards/category-guard';
import { HomePage } from '@pages/home/home-page';
import { ExercicePage } from '@pages/exercice/exercice-page';

export const routes: Routes = [
  {
    path: '',
    title: 'Vocabulaire Espagnol - Voces',
    component: HomePage,
  },
  {
    path: '',
    canMatch: [canMatchCategory],
    children: [
      {
        path: ':category',
        resolve: {
          category: categoryResolver,
        },
        children: [
          {
            path: '',
            title: categoryTitleResolver,
            component: CategoryPage,
          },
          {
            path: ':group',
            resolve: {
              group: groupResolver,
            },
            children: [
              {
                path: '',
                title: exerciceTitleResolver,
                component: ExercicePage,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundPage,
    title: 'Page non trouvée | Voces',
  },
];
