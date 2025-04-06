import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { AnimationService } from '@services/animation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BreadcrumbComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private _animationService = inject(AnimationService);

  isAnimationDisabled = computed(
    () => !this._animationService.isAnimationEnabled()
  );
}
