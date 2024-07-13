import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { Category } from '@word/word.model';

@Component({
  standalone: true,
  imports: [RouterModule],
  templateUrl: './word-categories.component.html',
})
export class WordCategoriesComponent {
  categories = input.required<Category[]>();
}
