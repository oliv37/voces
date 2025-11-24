import { Component, input } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.html',
})
export class TopBar {
  readonly isHighlighted = input.required<boolean>();
}
