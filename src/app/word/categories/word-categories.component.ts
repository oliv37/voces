import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  templateUrl: './word-categories.component.html',
})
export class WordCategoriesComponent {
  categories = input.required<string[]>();
}
