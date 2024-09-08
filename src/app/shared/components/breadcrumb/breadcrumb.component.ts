import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
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
  route = inject(ActivatedRoute);

  breadCrumb = toSignal<BreadCrumb>(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => {
        // TODO : build breadcrumb from this.route.root.snapshot (ActivatedRouteSnapshot)
        /* 
        console.log(this.route.root.snapshot.url);
        console.log(this.route.root.snapshot?.children[0].component);
        console.log(this.route.root.snapshot?.children[0]?.children[0]);
        console.log(
          this.route.root.snapshot?.children[0]?.children[0]?.children[0]
            ?.children[0].children
        );
        */
        return buildBreadCrumb((e as NavigationEnd).urlAfterRedirects);
      })
    )
  );
}
