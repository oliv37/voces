import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { Breadcrumb } from '@models/breadcrumb.model';
import { buildBreadcrumb } from '@utils/breadcrumb.util';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);

  breadcrumb = toSignal<Breadcrumb, Breadcrumb>(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => buildBreadcrumb(this.route.root.snapshot))
    ),
    { initialValue: buildBreadcrumb(this.route.root.snapshot) }
  );
}
