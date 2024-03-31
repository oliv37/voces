import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Word } from '../word.model';
import { findRandomWords } from '../word.utils';

@Injectable()
export class WordExerciceService {
  private categoryWords: Word[] = [];
  private words: Word[] = [];

  constructor(route: ActivatedRoute) {
    this.categoryWords = route.snapshot.data['categoryWords'];
    this.words = findRandomWords(this.categoryWords);
  }

  getWords(): Word[] {
    return this.words;
  }

  reinitWords(): Word[] {
    this.words = findRandomWords(this.categoryWords);
    return this.words;
  }
}
