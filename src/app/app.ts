import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Animation } from '@services/animation';
import { Header } from '@components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
})
export class App {
  private _animation = inject(Animation);

  isAnimationDisabled = computed(() => !this._animation.isAnimationEnabled());
}
