import { Component } from '@angular/core';

@Component({
  selector: 'app-client-side',
  templateUrl: './client-side.component.html',
})
export class ClientSideComponent {
  isWindowDefined = typeof window !== 'undefined';
}
