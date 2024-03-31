import { Component } from '@angular/core';
import { WordExerciceService } from './word-exercice.service';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  providers: [WordExerciceService],
  templateUrl: './word-exercice.component.html',
})
export class WordExerciceComponent {
  clientSide: boolean = typeof window !== 'undefined';
}
