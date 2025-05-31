import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { type Breadcrumb as BreadcrumbModel } from '@models/breadcrumb';
import { buildBreadcrumb } from '@utils/breadcrumb';
import { scaleUpDown } from '@animations/scale-up-down';
import { ChevronRightIconComponent } from '@components/icon/chevron-right/chevron-right-icon.component';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink, ChevronRightIconComponent],
  templateUrl: './breadcrumb.html',
  animations: [scaleUpDown(100, '0.5s')],
})
export class Breadcrumb {
  router = inject(Router);
  route = inject(ActivatedRoute);

  breadcrumb = toSignal<BreadcrumbModel, BreadcrumbModel>(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => buildBreadcrumb(this.route.root.snapshot))
    ),
    { initialValue: buildBreadcrumb(this.route.root.snapshot) }
  );
}
