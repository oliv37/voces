import { Component, HostListener, inject, input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Word } from '../word.model';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './word-category.component.html',
})
export class WordCategoryComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);

  wordsInCategory = input.required<Word[]>();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.router.navigate(['exercice'], { relativeTo: this.route });
    }
  }
}
