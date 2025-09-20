import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { WORD_GROUPS } from './shared/utils/data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'exercice/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    async getPrerenderParams() {
      const wordGroups = await WORD_GROUPS;
      return wordGroups.map((g) => ({ id: g.id.toString() }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
