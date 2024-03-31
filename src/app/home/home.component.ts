import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LANG_CODES, LANG_LABELS } from '../shared/lang.constants';

@Component({
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  langCodes = LANG_CODES;
  langLabels = LANG_LABELS;
}
