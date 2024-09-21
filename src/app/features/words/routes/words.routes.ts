import { Routes } from '@angular/router';
import { WordsGroupComponent } from '../pages/words-group/words-group.component';
import { WordsExerciceComponent } from '../pages/words-exercice/words-exercice.component';
import { WORDS_CATEGORIES } from '../utils/words.util';
import { WordsCompletionService } from '../services/words-completion.service';
import { WordsCategoryListComponent } from '../pages/words-category-list/words-category-list.component';
import { WordsCategoryComponent } from '../pages/words-category/words-category.component';
import { canMatchWords } from '../guards/words.guard';
import {
  resolveWordsCategory,
  resolveWordsGroup,
} from '../resolvers/words.resolver';
import {
  resolveWordsCategoryTitle,
  resolveWordsExerciceTitle,
  resolveWordsGroupTitle,
} from '../resolvers/words-title.resolver';
import { WordsSettingService } from '../services/words-setting.service';

export const wordsRoutes: Routes = [
  {
    path: '',
    canMatch: [canMatchWords],
    providers: [WordsCompletionService, WordsSettingService],
    children: [
      {
        path: '',
        title: 'Vocabulaire Espagnol - Voces',
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
            title: resolveWordsCategoryTitle,
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
                title: resolveWordsGroupTitle,
                component: WordsGroupComponent,
              },
              {
                path: 'exercice',
                title: resolveWordsExerciceTitle,
                component: WordsExerciceComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];
