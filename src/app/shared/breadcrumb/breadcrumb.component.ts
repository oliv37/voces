import { Component, OnInit, inject, signal } from '@angular/core';
import {
  Navigation,
  NavigationEnd,
  Router,
  RouterLink,
  UrlSegment,
} from '@angular/router';
import { filter, tap } from 'rxjs';
import { getLinkLabel } from './breadcrumb.utils';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {
  router = inject(Router);

  segments = signal<UrlSegment[]>([]);

  ngOnInit(): void {
    this.segments.set(this.getSegments(this.router.lastSuccessfulNavigation));
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.segments.set(this.getSegments(this.router.getCurrentNavigation()));
      });
  }

  getSegments(navigation: Navigation | null): UrlSegment[] {
    return [
      new UrlSegment('/', {}),
      ...(navigation?.finalUrl?.root.children['primary']?.segments || []),
    ];
  }

  getRouterLink(idx: number) {
    return this.segments()
      .slice(0, idx + 1)
      .map((s) => s.path);
  }

  getLinkLabel(idx: number): string {
    return getLinkLabel({
      idx,
      segments: this.segments(),
    });
  }
}
