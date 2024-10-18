import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { GroupPageComponent } from '@pages/group/group-page.component';
import { CATEGORIES } from '@utils/category.util';
import { CategoryPageComponent } from './pages/category/category-page.component';
import { canMatchApp } from './app.guard';
import { HomePageComponent } from './pages/home/home-page.component';
import { ExercicePageComponent } from '@pages/exercice/exercice-page.component';
import { resolveCategory } from '@resolvers/category.resolver';
import { resolveGroup } from '@resolvers/group.resolver';
import { resolveCategoryTitle } from '@resolvers/category-title.resolver';
import { resolveGroupTitle } from '@resolvers/group-title.resolver';
import { resolveExerciceTitle } from '@resolvers/exercice-title.resolver';

export const routes: Routes = [
  {
    path: '',
    canMatch: [canMatchApp],
    children: [
      {
        path: '',
        title: 'Vocabulaire Espagnol - Voces',
        component: HomePageComponent,
        resolve: {
          categories: () => CATEGORIES,
        },
      },
      {
        path: ':category',
        resolve: {
          category: resolveCategory,
        },
        children: [
          {
            path: '',
            title: resolveCategoryTitle,
            component: CategoryPageComponent,
          },
          {
            path: ':group',
            resolve: {
              group: resolveGroup,
            },
            children: [
              {
                path: '',
                title: resolveGroupTitle,
                component: GroupPageComponent,
              },
              {
                path: 'exercice',
                title: resolveExerciceTitle,
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
