import { inject, Injectable, signal } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, first, skip } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private router = inject(Router);

  isAnimationEnabled = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationStart),
        skip(1),
        first()
      )
      .subscribe(() => this.isAnimationEnabled.set(true));
  }
}
