import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, BreadcrumbComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {}
