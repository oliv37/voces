import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { shuffle } from '@shared/array.util';
import { Word } from '../word.model';
import { findRandomWords } from '../word.util';

interface ReinitOptions {
  addToWordsAnswered?: boolean;
}

@Injectable()
export class WordExerciceService implements OnDestroy {
  private _wordsInCategory: Word[] = [];
  private _wordIdsAnswered = new Set<number>();
  private _words: Word[] = [];

  // mcq
  private _wordsNotChosen: Word[] = [];

  // form
  private _inputValues: string[] = [];
  lastInputFocusIndex = 0;

  private sub = new Subscription();

  get words(): Word[] {
    return this._words;
  }

  get inputValues(): string[] {
    return this._inputValues;
  }

  get nbWordsAnswered(): number {
    return this._wordIdsAnswered.size;
  }

  get nbWordsInCategory(): number {
    return this._wordsInCategory.length;
  }

  get wordsNotChosen(): Word[] {
    return this._wordsNotChosen;
  }

  constructor(public route: ActivatedRoute) {
    this.sub.add(route.data.subscribe(() => this.reinit()));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  markWordAsChosen() {
    this._wordsNotChosen = this._wordsNotChosen.slice(1);
  }

  reinit(opts?: ReinitOptions): void {
    if (opts?.addToWordsAnswered) {
      this._words
        .map((word) => word.id)
        .forEach((id) => this._wordIdsAnswered.add(id));
    }

    this._wordsInCategory = this.route.snapshot.data['wordsInCategory'];
    this.removeWordIdsAnsweredNotInCategory(this._wordsInCategory);
    this._words = findRandomWords(this._wordsInCategory, 10, [
      ...this._wordIdsAnswered,
    ]);

    // mcq
    this._wordsNotChosen = shuffle(this._words);

    // form
    this._inputValues = this._words.map((_) => '');
    this.lastInputFocusIndex = 0;
  }

  private removeWordIdsAnsweredNotInCategory(wordsInCategory: Word[]) {
    const wordsIdsInCategory = wordsInCategory.map((w) => w.id);
    this._wordIdsAnswered.forEach((id) => {
      if (!wordsIdsInCategory.includes(id)) {
        this._wordIdsAnswered.delete(id);
      }
    });
  }
}
