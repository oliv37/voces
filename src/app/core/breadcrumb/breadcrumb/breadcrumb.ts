import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { type Breadcrumb as BreadcrumbModel } from '@core/breadcrumb/breadcrumb.model';
import { buildBreadcrumb } from '@core/breadcrumb/breadcrumb-util';
import { ChevronRightIcon } from '@shared/icon/chevron-right/chevron-right-icon';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink, ChevronRightIcon],
  templateUrl: './breadcrumb.html',
})
export class Breadcrumb {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  protected readonly breadcrumb = toSignal<BreadcrumbModel, BreadcrumbModel>(
    this.#router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => buildBreadcrumb(this.#route))
    ),
    { initialValue: buildBreadcrumb(this.#route) }
  );
}
