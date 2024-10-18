import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
