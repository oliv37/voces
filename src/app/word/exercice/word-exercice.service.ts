import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { shuffle } from '@shared/array.util';
import { Word } from '../word.model';
import { findRandomWords } from '../word.util';

interface ReinitOptions {
  resetWordsAnswered?: boolean;
  addToWordsAnswered?: boolean;
}

@Injectable()
export class WordExerciceService implements OnDestroy {
  private wordsInCategory: Word[] = [];
  private wordIdsAnswered = new Set<number>();
  private exerciceWords: Word[] = [];

  // mcq
  private exerciceWordsNotChosen: Word[] = [];

  // form
  private inputValues: string[] = [];
  private lastInputFocusIndex = 0;

  private sub = new Subscription();

  constructor(public route: ActivatedRoute) {
    this.sub.add(
      route.data.subscribe(() => this.reinit({ resetWordsAnswered: true }))
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getWords(): Word[] {
    return this.exerciceWords;
  }

  getInputValues(): string[] {
    return this.inputValues;
  }

  getNbWordsAnswered(): number {
    return this.wordIdsAnswered.size;
  }

  getNbWordsInCategory(): number {
    return this.wordsInCategory.length;
  }

  setLastInputFocusIndex(index: number) {
    this.lastInputFocusIndex = index;
  }

  getLastInputFocusIndex(): number {
    return this.lastInputFocusIndex;
  }

  getWordsNotChosen(): Word[] {
    return this.exerciceWordsNotChosen;
  }

  popWordNotChosen() {
    this.exerciceWordsNotChosen = this.exerciceWordsNotChosen.slice(1);
  }

  reinit(opts?: ReinitOptions): void {
    if (opts?.addToWordsAnswered) {
      this.exerciceWords
        .map((word) => word.id)
        .forEach((id) => this.wordIdsAnswered.add(id));
    }

    if (opts?.resetWordsAnswered) {
      this.wordIdsAnswered.clear();
    }

    this.wordsInCategory = this.route.snapshot.data['wordsInCategory'];
    this.exerciceWords = findRandomWords(this.wordsInCategory, 10);
    this.exerciceWordsNotChosen = shuffle(this.exerciceWords);
    this.inputValues = this.exerciceWords.map((_) => '');
    this.lastInputFocusIndex = 0;
  }
}
