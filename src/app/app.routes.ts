import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WordCategoryComponent } from './word/category/word-category.component';
import { WordHomeComponent } from './word/home/word-home.component';
import { WordCategoriesComponent } from './word/categories/word-categories.component';
import { categoriesResolver } from './word/categories/word-categories.resolver';
import { canMatchWord } from './word/can-match-word';
import { wordsInCategoryResolver } from './word/words-in-category.resolver';
import { canMatchCategory } from './word/category/can-match-category';
import { WordExerciceComponent } from './word/exercice/word-exercice.component';
import { WordExercicePreviewComponent } from './word/exercice/preview/word-exercice-preview.component';
import { WordExerciceMcqComponent } from './word/exercice/mcq/word-exercice-mcq.component';
import { WordExerciceFormComponent } from './word/exercice/form/word-exercice-form.component';
import { wordsResolver } from './word/words.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: ':lang',
    canMatch: [canMatchWord],
    component: WordHomeComponent,
    resolve: {
      words: wordsResolver,
    },
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
              wordsInCategory: wordsInCategoryResolver,
            },
          },
          {
            path: 'exercice',
            component: WordExerciceComponent,
            resolve: {
              wordsInCategory: wordsInCategoryResolver,
            },
            children: [
              {
                path: '',
                component: WordExercicePreviewComponent,
              },
              {
                path: 'qcm',
                component: WordExerciceMcqComponent,
              },
              {
                path: 'formulaire',
                component: WordExerciceFormComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
