import { Component, OnInit } from '@angular/core';
import { Word } from '../../word.model';
import { sample } from '../../../shared/array.utils';
import { WordExerciceService } from '../word-exercice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './word-exercice-mcq.component.html',
})
export class WordExerciceMcqComponent implements OnInit {
  words: Word[] = [];
  word?: Word;
  answeredWords: Word[] = [];
  mask = '';

  constructor(
    private wordExerciceService: WordExerciceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.words = this.wordExerciceService.getWords();
    this.word = sample(this.getNotAnsweredWords());
    this.mask = this.createMask();
  }

  onClick(answer: Word) {
    const isValidAnswer = answer === this.word;
    if (isValidAnswer) {
      this.answeredWords.push(answer);
      if (this.areAllWordsAnswered()) {
        this.resetExercice();
      } else {
        this.word = sample(this.getNotAnsweredWords());
      }
    }
  }

  private getNotAnsweredWords(): Word[] {
    return this.words.filter((w) => !this.answeredWords.includes(w));
  }

  private areAllWordsAnswered(): boolean {
    return this.answeredWords.length === this.words.length;
  }

  private createMask() {
    return [...Array(this.getMaskLength()).keys()].map((_) => '*').join('');
  }

  private getMaskLength(): number {
    return this.words.reduce(
      (acc, word) => Math.max(acc, word.value.length),
      0
    );
  }

  private resetExercice(): void {
    this.wordExerciceService.reinitWords();
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
