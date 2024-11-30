import { Component, input } from '@angular/core';

@Component({
  selector: 'app-caret',
  templateUrl: './caret.component.html',
})
export class CaretComponent {
  active = input.required<boolean>();
}
