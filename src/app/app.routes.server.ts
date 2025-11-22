import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { WORD_GROUPS_PROMISE } from '@word/word-data';
import { TEXT_IDS } from '@text/text-data';

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
    path: 'text/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    async getPrerenderParams() {
      return TEXT_IDS.map((textId) => ({ id: textId }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
