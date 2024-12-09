import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { GroupPageComponent } from '@pages/group/group-page.component';
import { CategoryPageComponent } from './pages/category/category-page.component';
import { canMatchCategory } from './guards/category.guard';
import { HomePageComponent } from './pages/home/home-page.component';
import { ExerciceGroupPageComponent } from '@pages/exercice-group/exercice-group-page.component';
import { resolveCategory } from '@resolvers/category.resolver';
import { resolveGroup } from '@resolvers/group.resolver';
import { resolveCategoryTitle } from '@resolvers/title/category-title.resolver';
import { resolveGroupTitle } from '@resolvers/title/group-title.resolver';
import { resolveExerciceGroupTitle } from '@resolvers/title/exercice-group-title.resolver';
import { ExercicePageComponent } from '@pages/exercice/exercice-page.component';
import { ExerciceService } from '@services/exercice.service';

export const routes: Routes = [
  {
    path: '',
    title: 'Vocabulaire Espagnol - Voces',
    component: HomePageComponent,
  },
  {
    path: 'exercice',
    title: 'Exercice Vocabulaire Espagnol - Voces',
    component: ExercicePageComponent,
    providers: [ExerciceService],
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
                title: resolveExerciceGroupTitle,
                component: ExerciceGroupPageComponent,
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
