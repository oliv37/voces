import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { DATA } from '@utils/data.util';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':category',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    async getPrerenderParams() {
      return DATA.flat().map((category) => ({
        category: category.pathParam,
      }));
    },
  },
  {
    path: ':category/:group',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    async getPrerenderParams() {
      return DATA.flat()
        .map((category) =>
          category.groups.map((group) => ({
            category: category.pathParam,
            group: group.pathParam,
          }))
        )
        .flat();
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
