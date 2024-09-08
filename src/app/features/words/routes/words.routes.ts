import { Routes } from '@angular/router';
import { WordsGroupComponent } from '../pages/words-group/words-group.component';
import { WordsGroupExerciceComponent } from '../pages/words-group-exercice/words-group-exercice.component';
import { WORDS_CATEGORIES } from '../utils/words.util';
import { WordsGroupCompletionService } from '../services/words-group-completion.service';
import { WordsCategoryListComponent } from '../pages/words-category-list/words-category-list.component';
import { WordsCategoryComponent } from '../pages/words-category/words-category.component';
import { canMatchWords } from '../guards/words.guard';
import {
  resolveWordsCategory,
  resolveWordsGroup,
} from '../resolvers/words.resolver';

export const wordsRoutes: Routes = [
  {
    path: '',
    canMatch: [canMatchWords],
    providers: [WordsGroupCompletionService],
    children: [
      {
        path: '',
        component: WordsCategoryListComponent,
        resolve: {
          wordsCategories: () => WORDS_CATEGORIES,
        },
      },
      {
        path: ':wordsCategory',
        resolve: {
          wordsCategory: resolveWordsCategory,
        },
        children: [
          {
            path: '',
            component: WordsCategoryComponent,
          },
          {
            path: ':wordsGroup',
            resolve: {
              wordsGroup: resolveWordsGroup,
            },
            children: [
              {
                path: '',
                component: WordsGroupComponent,
              },
              {
                path: 'exercice',
                component: WordsGroupExerciceComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];
