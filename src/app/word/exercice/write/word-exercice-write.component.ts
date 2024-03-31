import {
  Component,
  EventEmitter,
  Output,
  Input,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Word } from '../../word.model';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-word-exercice-write',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './word-exercice-write.component.html',
})
export class WordQuestionComponent implements AfterViewInit {
  @Input({ required: true }) words: Word[] = [];
  @Input({ required: true }) answers: string[] = [];
  @Input() focusIndex = 0;

  @Output() backEvent = new EventEmitter<void>();
  @Output() nextEvent = new EventEmitter<void>();
  @Output() focusIndexChange = new EventEmitter<number>();

  @ViewChildren(NgModel, { read: ElementRef }) vc!: QueryList<
    ElementRef<HTMLInputElement>
  >;

  areAllAnswersValid(): boolean {
    return this.answers.every((_, i) => this.isAnswerValid(i));
  }

  onInputChange(currentIndex: number) {
    if (this.isAnswerValid(currentIndex)) {
      const nextIndex = this.findNextIndexToFocus(currentIndex);
      if (nextIndex !== -1) {
        this.vc.get(nextIndex)?.nativeElement?.focus();
      }
    }
  }

  ngAfterViewInit(): void {
    this.vc.get(this.focusIndex)?.nativeElement?.focus();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'ArrowLeft') {
      this.backEvent.emit();
    }
    if (
      event.ctrlKey &&
      event.key === 'ArrowRight' &&
      this.areAllAnswersValid()
    ) {
      this.nextEvent.emit();
    }
  }

  private isAnswerValid(index: number) {
    return this.answers[index] === this.words[index]?.value;
  }

  private findNextIndexToFocus(currentIndex: number) {
    const length = this.answers.length;
    let index = (currentIndex + 1) % length;
    let iter = 0;

    while (iter++ < length) {
      if (!this.isAnswerValid(index)) {
        return index;
      }
      index = (index + 1) % length;
    }

    return -1;
  }
}
