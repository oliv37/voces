import { Component } from '@angular/core';
import { BtnDirective } from '@directives/btn/btn.directive';

@Component({
  selector: 'app-exercice-button-bar',
  templateUrl: './exercice-button-bar.component.html',
  imports: [BtnDirective],
  standalone: true,
})
export class ExerciceButtonBarComponent {}
