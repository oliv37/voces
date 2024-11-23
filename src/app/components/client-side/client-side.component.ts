import { Component } from '@angular/core';

@Component({
  selector: 'app-client-side',
  standalone: true,
  templateUrl: './client-side.component.html',
})
export class ClientSideComponent {
  isWindowDefined = typeof window !== 'undefined';
}
