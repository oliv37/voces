import { Routes } from '@angular/router';
import { WordsGroupComponent } from '../pages/words-group/words-group.component';
import { WordsGroupListComponent } from '../pages/words-group-list/words-group-list.component';
import { WordsGroupExerciceComponent } from '../pages/words-group-exercice/words-group-exercice.component';
import { resolveWordsGroup } from '../resolvers/words-group.resolver';
import { findWordsGroupList } from '../utils/words.util';
import { WordsCompletionService } from '../services/words-completion.service';

const WORDS_GROUP_LIST = findWordsGroupList();

export const wordsRoutes: Routes = [
  {
    path: '',
    providers: [WordsCompletionService],
    children: [
      {
        path: '',
        component: WordsGroupListComponent,
        resolve: {
          wordsGroupList: () => WORDS_GROUP_LIST,
        },
      },
      {
        path: ':wordsGroupId',
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
];
