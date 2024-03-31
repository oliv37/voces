import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WordCategoryComponent } from './word/category/word-category.component';
import { WordHomeComponent } from './word/home/word-home.component';
import { WordCategoriesComponent } from './word/categories/word-categories.component';
import { categoriesResolver } from './word/categories/word-categories.resolver';
import { canMatchWord } from './word/can-match-word';
import { wordsResolver } from './word/words-resolver';
import { canMatchCategory } from './word/category/can-match-category';
import { WordExerciceComponent } from './word/exercice/word-exercice.component';
import { WordExercicePreviewComponent } from './word/exercice/preview/word-exercice-preview.component';
import { WordExerciceMcqComponent } from './word/exercice/mcq/word-exercice-mcq.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: ':lang',
    canMatch: [canMatchWord],
    component: WordHomeComponent,
    children: [
      {
        path: '',
        component: WordCategoriesComponent,
        resolve: {
          categories: categoriesResolver,
        },
      },
      {
        path: ':categoryNumber',
        canMatch: [canMatchCategory],
        children: [
          {
            path: '',
            component: WordCategoryComponent,
            resolve: {
              words: wordsResolver,
            },
          },
          {
            path: 'exercice',
            component: WordExerciceComponent,
            resolve: {
              categoryWords: wordsResolver,
            },
            children: [
              {
                path: '',
                component: WordExercicePreviewComponent,
              },
              {
                path: 'mcq',
                component: WordExerciceMcqComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
