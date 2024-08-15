import { Routes } from '@angular/router';
import { wordsRoutes } from '@features/words/routes/words.routes';

export const routes: Routes = [...wordsRoutes, { path: '**', redirectTo: '/' }];
