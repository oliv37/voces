import { Component } from '@angular/core';
import { WordExerciceService } from './word-exercice.service';
import { RouterOutlet } from '@angular/router';
import { isClientSide } from '../../shared/utils/client-side.utils';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  providers: [WordExerciceService],
  templateUrl: './word-exercice.component.html',
})
export class WordExerciceComponent {
  clientSide: boolean = isClientSide();
}
