import { Component, OnInit, inject, input } from '@angular/core';
import {
  Navigation,
  NavigationEnd,
  Router,
  RouterLink,
  UrlSegment,
} from '@angular/router';
import { filter } from 'rxjs';
import { getLinkLabel } from './word-breadcrumb.utils';

@Component({
  selector: 'app-word-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './word-breadcrumb.component.html',
})
export class WordBreadcrumbComponent implements OnInit {
  nbWords = input.required<number>();

  router = inject(Router);

  segments: UrlSegment[] = [];

  ngOnInit(): void {
    this.segments = this.getSegments(this.router.lastSuccessfulNavigation);
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.segments = this.getSegments(this.router.getCurrentNavigation());
      });
  }

  getSegments(navigation: Navigation | null): UrlSegment[] {
    return [
      new UrlSegment('/', {}),
      ...(navigation?.extractedUrl.root.children['primary']?.segments || []),
    ];
  }

  getRouterLink(idx: number) {
    return this.segments.slice(0, idx + 1).map((s) => s.path);
  }

  getLinkLabel(idx: number): string {
    return getLinkLabel({
      idx,
      segments: this.segments,
      nbWords: this.nbWords(),
    });
  }
}
