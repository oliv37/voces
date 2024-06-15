import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isClientSide } from '@shared/client-side.utils';
import { WordExerciceService } from './word-exercice.service';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  providers: [WordExerciceService],
  templateUrl: './word-exercice.component.html',
})
export class WordExerciceComponent {
  clientSide: boolean = isClientSide();
}
