import { Component } from '@angular/core';

@Component({
  selector: 'app-client-side',
  templateUrl: './client-side.html',
})
export class ClientSide {
  protected readonly isWindowDefined = typeof window !== 'undefined';
}
