import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Word } from '../word.model';
import { findRandomWords } from '../word.utils';
import { Subscription } from 'rxjs';
import { shuffle } from '../../shared/array.utils';

@Injectable()
export class WordExerciceService implements OnDestroy {
  private categoryWords: Word[] = [];
  private words: Word[] = [];

  // mcq
  private wordsNotChosen: Word[] = [];

  // form
  private inputValues: string[] = [];
  private lastInputFocusIndex = 0;

  private sub = new Subscription();

  constructor(route: ActivatedRoute) {
    this.sub.add(
      route.data.subscribe((data) => {
        this.categoryWords = data['categoryWords'];
        this.reinit();
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getWords(): Word[] {
    return this.words;
  }

  getInputValues(): string[] {
    return this.inputValues;
  }

  setLastInputFocusIndex(index: number) {
    this.lastInputFocusIndex = index;
  }

  getLastInputFocusIndex(): number {
    return this.lastInputFocusIndex;
  }

  getWordsNotChosen(): Word[] {
    return this.wordsNotChosen;
  }

  popWordNotChosen() {
    this.wordsNotChosen = this.wordsNotChosen.slice(1);
  }

  reinit(): void {
    this.words = findRandomWords(this.categoryWords, 10);
    this.wordsNotChosen = shuffle(this.words);
    this.inputValues = this.words.map((_) => '');
    this.lastInputFocusIndex = 0;
  }
}
