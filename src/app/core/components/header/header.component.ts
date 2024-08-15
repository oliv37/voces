import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ALL_WORDS } from '@features/words/utils/words.util';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  nbWords = ALL_WORDS.length;
}
