import { Component, inject, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { ExerciceLevelInfoComponent } from '@components/exercice/exercice-level-info/exercice-level-info.component';
import { filter, first, skip } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BreadcrumbComponent, ExerciceLevelInfoComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  router = inject(Router);
  isAnimationDisabled = true;

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationStart),
        skip(1),
        first()
      )
      .subscribe(() => (this.isAnimationDisabled = false));
  }
}
