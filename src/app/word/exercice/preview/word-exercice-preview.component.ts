import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Word } from '../../word.model';
import { WordExerciceService } from '../word-exercice.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './word-exercice-preview.component.html',
})
export class WordExercicePreviewComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  wordExerciceService = inject(WordExerciceService);

  get words(): Word[] {
    return this.wordExerciceService.getWords();
  }

  reinit() {
    this.wordExerciceService.reinit();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.router.navigate(['qcm'], { relativeTo: this.route });
    }
  }
}
