import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { WORD_GROUPS_PROMISE } from './word/datas/word-data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'word/exercice/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    async getPrerenderParams() {
      const wordGroups = await WORD_GROUPS_PROMISE;
      return wordGroups.map((g) => ({ id: g.id.toString() }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
