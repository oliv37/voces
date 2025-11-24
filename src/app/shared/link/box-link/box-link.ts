import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-box-link',
  templateUrl: './box-link.html',
  imports: [RouterLink],
})
export class BoxLink {
  readonly title = input.required<string>();
  readonly link = input.required<string | string[]>();
  readonly description = input<string>();
  readonly isHighlighted = input<boolean>(false);
}
