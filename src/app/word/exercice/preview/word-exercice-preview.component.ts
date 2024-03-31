import { Component, HostListener, OnInit } from '@angular/core';
import { Word } from '../../word.model';
import { WordExerciceService } from '../word-exercice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './word-exercice-preview.component.html',
})
export class WordExercicePreviewComponent implements OnInit {
  words: Word[] = [];

  constructor(
    private wordExerciceService: WordExerciceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.words = this.wordExerciceService.getWords();
  }

  reinit() {
    this.words = this.wordExerciceService.reinitWords();
  }

  next() {
    this.router.navigate(['mcq'], { relativeTo: this.route });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.next();
    }
  }
}
