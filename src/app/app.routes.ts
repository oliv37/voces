import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { GroupPageComponent } from '@pages/group/group-page.component';
import { CategoryPageComponent } from './pages/category/category-page.component';
import { canMatchCategory } from './guards/category.guard';
import { HomePageComponent } from './pages/home/home-page.component';
import { ExercicePageComponent } from '@pages/exercice/exercice-page.component';
import { resolveCategory } from '@resolvers/category.resolver';
import { resolveGroup } from '@resolvers/group.resolver';
import { resolveCategoryTitle } from '@resolvers/title/category-title.resolver';
import { resolveGroupTitle } from '@resolvers/title/group-title.resolver';
import { resolveExerciceTitle } from '@resolvers/title/exercice-title.resolver';
import { ExerciceAllPageComponent } from '@pages/exercice-all/exercice-all-page.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Vocabulaire Espagnol - Voces',
    component: HomePageComponent,
  },
  {
    path: 'exercice',
    title: 'Exercice Vocabulaire Espagnol - Voces',
    component: ExerciceAllPageComponent,
  },
  {
    path: '',
    canMatch: [canMatchCategory],
    children: [
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
