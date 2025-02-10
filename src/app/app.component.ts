import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { ExerciceLevelInfoComponent } from '@components/exercice/exercice-level-info/exercice-level-info.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BreadcrumbComponent, ExerciceLevelInfoComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
