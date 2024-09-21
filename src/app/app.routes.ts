import { Routes } from '@angular/router';
import { NotFoundComponent } from '@core/pages/not-found/not-found.component';
import { wordsRoutes } from '@features/words/routes/words.routes';

export const routes: Routes = [
  ...wordsRoutes,
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page non trouvée | Voces',
  },
];
