import {
  Component,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  inject,
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WordExerciceService } from '../word-exercice.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './word-exercice-form.component.html',
})
export class WordExerciceFormComponent implements AfterViewInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  wordExerciceService = inject(WordExerciceService);

  get words() {
    return this.wordExerciceService.getWords();
  }

  get inputValues() {
    return this.wordExerciceService.getInputValues();
  }

  get lastInputFocusIndex() {
    return this.wordExerciceService.getLastInputFocusIndex();
  }

  set lastInputFocusIndex(index: number) {
    this.wordExerciceService.setLastInputFocusIndex(index);
  }

  @ViewChildren(NgModel, { read: ElementRef }) inputs!: QueryList<
    ElementRef<HTMLInputElement>
  >;

  ngAfterViewInit(): void {
    this.inputs.get(this.lastInputFocusIndex)?.nativeElement?.focus();
  }

  onInput(currentIndex: number) {
    if (this.isAnswerValid(currentIndex)) {
      const nextIndex = this.findNextIndexToFocus(currentIndex);
      if (nextIndex >= 0) {
        this.inputs.get(nextIndex)?.nativeElement?.focus();
      }
    }
  }

  isWin(): boolean {
    return this.inputValues.every((_, i) => this.isAnswerValid(i));
  }

  handleSubmit() {
    this.router.navigate(['..'], { relativeTo: this.route }).then(() => {
      this.wordExerciceService.reinit({
        addToWordsAnswered: true,
      });
    });
  }

  private isAnswerValid(index: number) {
    return this.inputValues[index] === this.words[index]?.value;
  }

  private findNextIndexToFocus(currentIndex: number) {
    const length = this.inputValues.length;
    let nextIndex = (currentIndex + 1) % length;

    for (let i = 0; i < length; i++) {
      if (!this.isAnswerValid(nextIndex)) {
        return nextIndex;
      }
      nextIndex = (nextIndex + 1) % length;
    }

    return -1;
  }
}
