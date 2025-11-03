import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-box-link',
  templateUrl: './box-link.html',
  imports: [RouterLink],
})
export class BoxLink {
  title = input.required<string>();
  link = input.required<string | string[]>();
  description = input<string>();
}
