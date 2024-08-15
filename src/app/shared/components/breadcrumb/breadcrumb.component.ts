import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { BreadCrumb } from '../../models/breadcrumb.model';
import { buildBreadCrumb } from '../../utils/breadcrumb.util';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  router = inject(Router);

  breadCrumb = toSignal<BreadCrumb>(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => buildBreadCrumb((e as NavigationEnd).urlAfterRedirects))
    )
  );
}
