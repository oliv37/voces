import { Component, input } from '@angular/core';
import { Word } from '../word.model';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './word-category.component.html',
})
export class WordCategoryComponent {
  wordsInCategory = input.required<Word[]>();
}
