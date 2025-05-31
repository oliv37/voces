import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { CategoryPageComponent } from './pages/category/category-page.component';
import { canMatchCategory } from './guards/category-guard';
import { HomePageComponent } from './pages/home/home-page.component';
import { ExercicePageComponent } from '@pages/exercice/exercice-page.component';
import { categoryResolver } from '@resolvers/category-resolver';
import { groupResolver } from '@resolvers/group-resolver';
import { categoryTitleResolver } from '@resolvers/category-title-resolver';
import { exerciceTitleResolver } from '@resolvers/exercice-title.resolver';

export const routes: Routes = [
  {
    path: '',
    title: 'Vocabulaire Espagnol - Voces',
    component: HomePageComponent,
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
            component: CategoryPageComponent,
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
                component: ExercicePageComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    title: 'Page non trouvée | Voces',
  },
];
