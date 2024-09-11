import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WordsCategory } from '@features/words/models/word.model';

// TODO : split data in txt files of 500 lines max

// TODO : use 2 columns in desktop mode

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
