import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { isClientSide } from '@shared/client-side.util';
import { WordExerciceService } from './word-exercice.service';

interface Link {
  url: string;
  label: string;
}

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  providers: [WordExerciceService],
  templateUrl: './word-exercice.component.html',
})
export class WordExerciceComponent {
  clientSide: boolean = isClientSide();
  links: Link[] = [
    { url: '.', label: 'liste' },
    { url: 'qcm', label: 'qcm' },
    { url: 'formulaire', label: 'formulaire' },
  ];
}
