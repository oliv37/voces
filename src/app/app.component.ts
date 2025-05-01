import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimationService } from '@services/animation.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private _animationService = inject(AnimationService);

  isAnimationDisabled = computed(
    () => !this._animationService.isAnimationEnabled()
  );
}
