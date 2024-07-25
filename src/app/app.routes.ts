import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WordCategoryComponent } from './word/category/word-category.component';
import { WordCategoriesComponent } from './word/categories/word-categories.component';
import { resolveCategories } from './word/categories/word-categories.resolver';
import { wordsMatcher } from './word/word.can-match';
import { WordExerciceComponent } from './word/exercice/word-exercice.component';
import { WordExercicePreviewComponent } from './word/exercice/preview/word-exercice-preview.component';
import { WordExerciceMcqComponent } from './word/exercice/mcq/word-exercice-mcq.component';
import { WordExerciceFormComponent } from './word/exercice/form/word-exercice-form.component';
import {
  resolveWords,
  resolveWordsInCategoryResolver,
} from './word/word.resolver';
import { resolveHomeLangs } from './home/home.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      homeLangs: resolveHomeLangs,
    },
  },
  {
    path: ':langCode',
    canMatch: [wordsMatcher],
    resolve: {
      words: resolveWords,
    },
    children: [
      {
        path: '',
        component: WordCategoriesComponent,
        resolve: {
          categories: resolveCategories,
        },
      },
      {
        path: ':categoryNumber',
        children: [
          {
            path: '',
            component: WordCategoryComponent,
            resolve: {
              wordsInCategory: resolveWordsInCategoryResolver,
            },
          },
          {
            path: 'exercice',
            component: WordExerciceComponent,
            resolve: {
              wordsInCategory: resolveWordsInCategoryResolver,
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
  { path: '**', redirectTo: '/' },
];
