import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  input,
  signal,
  untracked,
  ViewChild,
} from '@angular/core';
import { ClientSideComponent } from '@components/client-side/client-side.component';
import { ExerciceService } from '@services/exercice.service';
import { Category } from '@models/category.model';
import { Group } from '@models/group.model';
import { Word } from '@models/word.model';

@Component({
    imports: [ClientSideComponent],
    templateUrl: './exercice-page.component.html',
    providers: [ExerciceService]
})
export class ExercicePageComponent implements AfterViewInit {
  category = input.required<Category>();
  group = input.required<Group>();

  word = signal<Word | undefined>(undefined);
  text = signal('');
  index = 0;

  @ViewChild('inputEl', { static: false })
  inputEl?: ElementRef;

  constructor() {
    effect(() => {
      const group = this.group();

      untracked(() => {
        this.index = 0;
        this.word.set(group.words[this.index]);
        this.text.set('');
      });
    });
  }

  ngAfterViewInit() {
    this.inputEl?.nativeElement.focus();
  }

  onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const targetValue = target.value;
    const maxLength = this.word()?.es.length || 0;

    if (targetValue.length > maxLength) {
      target.value = this.text();
      return;
    }

    this.text.set(targetValue);

    const isCorrectAnswer = targetValue === this.word()?.es;
    if (isCorrectAnswer) {
      this.index = (this.index + 1) % this.group().words.length;
      this.word.set(this.group().words[this.index]);
      this.text.set('');
    }
  }

  onKeydown(e: KeyboardEvent) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
    }
  }

  onClick() {
    console.log('click');
  }
}
