import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WordsCategory } from '@features/words/models/word.model';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './words-category-list.component.html',
})
export class WordsCategoryListComponent {
  wordsCategories = input.required<WordsCategory[]>();
  nbWords = computed<number>(() =>
    this.wordsCategories()
      .map((wordsCategory) => wordsCategory.nbWords)
      .reduce((acc, curr) => acc + curr, 0)
  );
}
